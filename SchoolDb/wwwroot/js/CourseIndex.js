var app = new Vue({
    el: "#vue-app",
    data: {

    },
    methods: {
        openCourseDetails: (id) => {
            window.location.href = window.location.href + "/" + id;
        }
    }
});