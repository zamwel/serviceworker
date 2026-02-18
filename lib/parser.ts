export interface DecryptedData {
    indexNumber: string;
    candidateName: string;
    examType: string;
    center: string;
    subjects: { name: string; grade: string; interpretation: string }[];
    date?: string;
}

export const getGradeInterpretation = (grade: string): string => {
    const g = grade.toUpperCase().trim();
    if (g === 'A1') return 'EXCELLENT';
    if (g === 'B2') return 'VERY GOOD';
    if (g === 'B3') return 'GOOD';
    if (g === 'C4') return 'CREDIT';
    if (g === 'C5') return 'CREDIT';
    if (g === 'C6') return 'CREDIT';
    if (g === 'D7') return 'PASS';
    if (g === 'E8') return 'PASS';
    if (g === 'F9') return 'FAIL';
    return '-';
}

export function parseDecryptedText(text: string): DecryptedData {
    const parts = text.split('\n').map(p => p.trim()).filter(p => p !== '');
   // console.log(text);

    if (parts.length < 4) {
        throw new Error("Invalid decrypted data format");
    }


    const indexNumber = parts[0];
    const candidateName = parts[1];
    const examType = parts[2];
    const center = parts[3];

    const subjects: DecryptedData['subjects'] = [];

    for (let i = 4; i < parts.length; i++) {
        const subjectPart = parts[i];
        if (subjectPart.includes(':')) {
            const [name, grade] = subjectPart.split(':');
            subjects.push({
                name: name.trim(),
                grade: grade.trim(),
                interpretation: getGradeInterpretation(grade.trim())
            });
        }
    }

    const result = {
        indexNumber,
        candidateName,
        examType,
        center,
        subjects
    };

    // match user's debug log
    return result;
}
