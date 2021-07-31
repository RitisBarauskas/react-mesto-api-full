const reverseArray = (arr) => arr.map((_, idx, arr) => arr[arr.length - 1 - idx ]);

export default reverseArray;