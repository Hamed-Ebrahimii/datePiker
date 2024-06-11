export function convertPersianNumbersToEnglish(input : string) {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < persianNumbers.length; i++) {
        input = input.replace(persianNumbers[i], englishNumbers[i]);
    }

    return input;
}
export function convertEnglishNumbersToPersian(input : string) {
    const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    for (let i = 0; i < englishNumbers.length; i++) {
        input = input.replace(englishNumbers[i], persianNumbers[i]);
    }

    return input;
}