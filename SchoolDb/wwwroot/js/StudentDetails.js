function removeEnrollment(studentId, courseIndex) {
var enrollment = app.updatedCourse.students[index];
$.ajax({
    url: "Enrollment/DeleteEnrollment/" + enrollment.id,
    type: "DELETE",
    success: (result) => {
        if (result === "ok") {
            app.updatedCourse.students.splice(index, 1);
        } else {
            alert("Det gick inte att ta bort studenten från kursen. " + result);
        }
    }
});

var app = new Vue({
    el: "#vue-app",
    data: {
        updateButtonDisabled: true,
        originalStudent: viewModel.student,
        updatedStudent: Vue.util.extend({}, viewModel.student)
    },
    computed: {
        studentInfoHasChanged: function () {
            return this.updatedStudent.firstName !== this.originalStudent.firstName ||
                this.updatedStudent.lastName !== this.originalStudent.lastName;
        }
    }
});