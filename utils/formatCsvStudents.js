const lnfNameFormatter = (fullName) => {
  const splitFullName = fullName.split(', ')
  const splitFirstName = splitFullName[1].split(' ')

  return {
    last: splitFullName[0],
    first: splitFirstName[0],
    middle: splitFirstName.length > 1 ? splitFirstName[1] : null,
  }
}

const birthDateFormatter = (rawBirthDate) => {
  const splitDate = rawBirthDate.split('-')
  return {
    year: splitDate[0],
    month: splitDate[1],
    day: splitDate[2],
  }
}

const formatStudentFromCsv = (rawStudent) => {
  const formattedStudent = {
    basicInfo: {
      name: lnfNameFormatter(rawStudent['Full Name (LNF)']),
      address: {
        fullStreet: rawStudent['Student Full Street'],
        unitNumber: rawStudent['Student Unit Number'],
        city: rawStudent['Student City'],
        state: rawStudent['Student State'],
        zipcode: rawStudent['Student Zip Code'],
      },
      contactsName: lnfNameFormatter(rawStudent['Contact Name (LNF)']),
      parentPhoneNumber: rawStudent['Parent Contact Phone'],

      gradeLevel: rawStudent.Grade,
      graduationYear: rawStudent['Grad Year'],
      email: rawStudent['Student Email Address'],
      dateOfBirth: birthDateFormatter(rawStudent['Date of Birth']),
    },
    districtID: rawStudent['District ID'],
  }

  return formattedStudent
}

const formatCsvStudents = (rawStudents) => {
  const formattedStudents = []

  rawStudents.forEach((student) => {
    const formattedStudent = formatStudentFromCsv(student)
    formattedStudents.push(formattedStudent)
  })

  return formattedStudents
}

module.exports = formatCsvStudents
