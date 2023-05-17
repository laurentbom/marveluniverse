const {createApp} = Vue;

createApp({
  data(){
    return{
      allDatas : [],
      search : "",
      searchResults: "",
      isDetails : "",
      heroDetails: null,
    }
  },
  methods : {
    getDatas(){
      fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
      .then(response => response.json())
      .then(data => {
        this.allDatas = data;
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error)
      })
    },
    searchForHero(){
      this.searchResults = this.allDatas.filter(superhero => superhero.name.toLowerCase().includes(this.search.toLowerCase()))
      // console.log(this.searchResults);
    },
    getHeroDetails(hero){
      this.isDetails = "moved";
      this.heroDetails = [];
      fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${hero}.json`)
      .then(response => response.json())
      .then(data => {
        this.heroDetails = data;
        console.log(this.heroDetails)
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error)
      })
    },
    closeDetails(){
      this.isDetails = "";
      this.heroDetails = null;
    }
  },
  mounted() {
    this.getDatas();
  },
}).mount("#app")