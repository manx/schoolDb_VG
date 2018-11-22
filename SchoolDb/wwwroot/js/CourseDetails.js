function removeEnrollment(index) {
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
} 


var app = new Vue({
    el: "#vue-app",
    data: {
        updateButtonDisabled: true,
        originalCourse: viewModel.course,
        updatedCourse: Vue.util.extend({}, viewModel.course)
    },
    computed: {
        studentInfoHasChanged: function () {
            return this.updatedCourse.Name !== this.originalCourse.Name;
        }
    },
    methods: {
        removeEnrollment: removeEnrollment
        
    }
});