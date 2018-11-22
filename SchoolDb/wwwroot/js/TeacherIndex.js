var app = new Vue({
    el: "#vue-app",
    data: {

    },
    methods: {
        openTeacherDetails: (id) => {
            window.location.href = window.location.href + "/" + id;
        }
    }
});