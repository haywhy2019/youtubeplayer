import React, {Component} from 'react';
import Suggestion from './Suggestion';
import {Form, Container, Embed, Divider, Grid} from 'semantic-ui-react';

class YoutubePlayer extends Component {
    constructor (){
        super()
        this.state = {
            query:'React',
            url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&
            &key=AIzaSyD1Gk2mXkZ0Uk1edc2sDhzfqauSUOslAyA&q=`,
            mainVideo: '',
            suggestedVideos: []
        }
        this.getVideos = this.getVideos.bind(this);
        this.searchVideos = this.searchVideos.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        //fetch Videos using default query state
        this.getVideos(this.state.query)
    }
    getVideos(searchQuery){
        let url = this.state.url + searchQuery;
        return (
            fetch(url).then(response => response.json())
            .then((data) => {
           
          
                let firstVideo = data.items.shift();
                this.setState({...this.state, mainVideo: firstVideo.id.videoId, suggestedVideos: data.items})
            })
        )

    }
    handleChange(e){
        this.setState({...this.state, query: e.target.value});
    }
    searchVideos(e){
        e.preventDefault();
        this.getVideos(this.state.query);
    }
    render() {
        return(
            <div>
            <Container textAlign='center'>
                <Form onSubmit={this.searchVideos} size='small'>
                    <Form.Group>
                        <Form.Input placeholder='search video' width={6} onChange={this.handleChange} />
                        <Form.Button content ='Search Videos'/>
                    </Form.Group>
                </Form>
                <Embed
    id={this.state.mainVideo}
    placeholder='https://tubularinsights.com/wp-content/uploads/2014/04/youtube-black-player.png'
    source='youtube'
  />
    <Divider horizontal>
        Suggestions
        </Divider>

        {/* <Grid doubling columns ={3}>
            {
                this.state.suggestedVideos.map((video) => <Suggestion video={video} /> )
            
            }
        </Grid> */}
                </Container>
        </div>
        )
       
    }
}


export default YoutubePlayer;