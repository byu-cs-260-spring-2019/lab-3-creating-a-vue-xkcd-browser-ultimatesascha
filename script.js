Vue.component('star-rating', VueStarRating.default);
let app = new Vue({
    el: '#app', //ID
    data: {
      number: '',
      max: '',
      current: {},   //current info about comic
      loading: true,
      addedName: '',
      addedComment: '',
      comments: {},
      ratings: {},
      loading: true,   //checks if loading or not. can make string for an output
    },
    created() {
      this.xkcd(); // call the function
    },
    methods: {
       async xkcd() {
           try {
              this.loading = true;
              const response = await axios.get('https://xkcd.now.sh/' + this.number);
              console.log("response: ", response);
              this.current = response.data;
              this.loading = false;
              this.number = response.data.num;
              return true;
           }
           catch(error) {
              console.log(error);
              this.loading = false;
              return false;
           }
               //   xkcd() {
    //     axios.get('https://xkcd.now.sh/' + this.number)
    //       .then(response => {
    //         this.current = response.data;
    //         return true;
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       });
    //   }
        },
        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
              this.number = 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
              this.number = this.max
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        addComment() {
            if (!(this.number in this.comments))
              Vue.set(app.comments, this.number, new Array);
            this.comments[this.number].push({
              author: this.addedName,
              text: this.addedComment,
              time: this.currentTime,
            });
            this.addedName = '';
            this.addedComment = '';
            var d = new Date();
            this.currentTime = d.toUTCString();
        },
        firstComic() {
          this.number = 1;
        },
        lastComic() {
          this.number = this.max;
        },
        setRating(rating){
          if (!(this.number in this.ratings))
            Vue.set(this.ratings, this.number, {
              sum: 0,
              total: 0,
              average: 0
            });
          this.ratings[this.number].sum += rating;
          this.ratings[this.number].total += 1;
          
            this.ratings[this.number].average = this.ratings[this.number].sum / this.ratings[this.number].total;

          return this.ratings[this.number].average;
        }
    },
    computed: {
      month() {
        var month = new Array;
        if (this.current.month === undefined) {
          return '';
        }
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[this.current.month - 1];
      },
      avgRating(rating) {
      }
    },
    watch: {                               
        number(value, oldvalue) {         //calls the API over again 
            if (oldvalue === '') {
                this.max = value;
            } 
            else {
                this.xkcd();
            }
        },
    },
  });