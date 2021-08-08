const contains = (str, query) => {
  if (str == null) return false

  if (str.toLowerCase().includes(query.toLowerCase())) return true

  return false
}

// returns true if the query is in the students information
const isQueriedStudent = (student, query) =>
  contains(student.basicInfo.name.first, query) ||
  contains(student.basicInfo.name.middle, query) ||
  contains(student.basicInfo.name.last, query) ||
  contains(student.basicInfo.contactsName.first, query) ||
  contains(student.basicInfo.contactsName.middle, query) ||
  contains(student.basicInfo.contactsName.last, query) ||
  contains(student.email, query) ||
  contains(student.districtID, query)

module.exports = isQueriedStudent
