import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      key:'enter your key here',
      searchKeyword: '',
      listOfVideos: [],
      loadingStatus: null ,
      currentVideoUrl: '',
      likeStatus: 'Like',
      isLoadingError: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingStatus: "LOADING",
    isLoadingError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=${this.state.key}`);
const myJson = await response.json();
if(myJson.items.length == 0) {
  this.setState({
    isLoadingError: true
  })
}
this.setState({
  listOfVideos: myJson.items
})
  this.setState({
    loadingStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingStatus: 'LOADING'
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=5&regionCode=IN&key=${this.state.key}`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  listOfVideos: myJson.items,
  loadingStatus: "LOADED"
})
this.setState({
  currentVideoUrl: this.state.listOfVideos[0].id.videoId
})
}
componentDidMount() {
  this.showMostPopularVideos()
}
setCurrentUrl = (id) => {

  this.setState({
    currentVideoUrl: id
  })
}
likeButton = () => {
  if(this.state.likeStatus == "Like"){
  this.setState({
    likeStatus: 'Liked'
  })
  } else {
      this.setState({
    likeStatus: 'Like'
  })
  }
}
  render() {
    let videos = this.state.listOfVideos.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '250px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))

    return (
      <div >

      <img src = "https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
      style={{ height: '50px'}}></img>
      <input  style={{ marginLeft:"300px",width:"430px" , marginRight:"10px"
      }} placeholder="Search here..." 
      onChange={this.setSearchValue} />
      <button  onClick={this.searchVideo}>Search</button>

      <div style={{marginLeft:"10px"}}>
      <hr/>
      {this.state.isLoadingError ? (<h1>No search found</h1>): (
      <iframe src={`https://www.youtube.com/embed/${this.state.currentVideoUrl}`} 
      style={{height: '500px', width: '900px', float : 'left'}}/>
      )}
      </div>
   

      <div style={{ width: '350px', float : 'right',marginLeft:"10px"}}>
      {this.state.loadingStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
      </div>
      <div style={{display: 'block', float: 'left'}}>
      <button  style={
      {marginLeft: "800px" , marginTop: "7px" , backgroundColor:"red",padding:'11px'}}
      onClick={this.likeButton}>{this.state.likeStatus}</button>
      </div>

      </div>
    );
  }
}
export default App;
