var app = new Vue({
    el: "#vue-app",
    data: {

    },
    methods: {
        openStudentDetails: (id) => {
            window.location.href = window.location.href + "/" + id;
        }
    }
});
