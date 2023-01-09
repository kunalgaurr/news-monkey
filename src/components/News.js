import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    // console.log('I am constructor from news component');
    this.state = {
      // articles: this.articles,
      loading: false,
    };
  }

  async componentDidMount() {
    console.log('Component did mount karr na bhenchod');
    let url =
      'https://newsapi.org/v2/top-headlines?apiKey=f06a2bb80cac4e7e8e26946074d964b4&country=in';

    let data = await fetch(url);

    let parsedData = await data.json;
    console.log(parsedData , 'Resultttttt' );

    this.setState({ articles: parsedData.articles });
  }

  render() {
    return (
      <div className="container my-3">
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={
                    element.description ? element.description.slice(0, 88) : ''
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
