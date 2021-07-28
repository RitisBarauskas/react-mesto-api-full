const Card = require("../models/card");

const { BadRequestError, ForbiddenError, NotFoundError } = require("../errors");

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      return Card.findById(card._id)
        .populate(["owner", "likes"])
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === "ValidationError" || err.name === "CastError") {
            throw new BadRequestError("Переданы некорректные данные");
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Отсутствует удаляемая карточка");
      }
      if (userId !== String(card.owner._id)) {
        throw new ForbiddenError("Нельзя удалять чужие карточки");
      }
      return Card.findByIdAndRemove(cardId)
        .orFail(() => {
          throw new NotFoundError("Отсутствует удаляемая карточка");
        })
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === "ValidationError" || err.name === "CastError") {
            throw new BadRequestError("Переданы некорректные данные");
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail(() => {
      throw new NotFoundError("Отсутствует лайкаемая карточка");
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail(() => {
      throw new NotFoundError("Отсутствует дизлайкаемая карточка");
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
    })
    .catch(next);
};
