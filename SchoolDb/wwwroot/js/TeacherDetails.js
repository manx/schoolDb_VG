var app = new Vue({
    el: "#vue-app",
    data: {
        updateButtonDisabled: true,
        originalTeacher: viewModel.teacher,
        updatedTeacher: Vue.util.extend({}, viewModel.teacher)
    },
    computed: {
        teacherInfoHasChanged: function () {
            return this.updatedTeacher.firstName !== this.originalTeacher.firstName ||
                this.updatedTeacher.lastName !== this.originalTeacher.lastName;
        }
    },
    methods: {
        resetValues: function () {
            
            var test = this.updatedTeacher;
            app.updatedTeacher = jQuery.extend({}, viewModel.teacher);
        }
    }
});