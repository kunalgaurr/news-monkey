import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f06a2bb80cac4e7e8e26946074d964b4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();
    // console.log(parsedData, 'Resultttttt');

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log('Next');

    if (!this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=f06a2bb80cac4e7e8e26946074d964b4&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true });

      let data = await fetch(url);

      let parsedData = await data.json();
      // console.log(parsedData, 'Resultttttt');

      this.setState({ articles: parsedData.articles });

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  handlePreviousClick = async () => {
    console.log('previous');

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=f06a2bb80cac4e7e8e26946074d964b4&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles });

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkey - Top Headlines</h1>
        {this.state.laoding && <Spinner></Spinner>}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3 my-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ''
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : 'https://images.hindustantimes.com/img/2021/10/15/1600x900/QVTL5BX2OROAXFOZ72CCIUY3UA_1634260087706_1634260097868.jpg'
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  disabled={this.state.page <= 1}
                  className="page-link"
                  onClick={this.handlePreviousClick}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={this.handleNextClick}
                  disabled={
                    this.state.page + 1 >
                    Math.ceil(this.state.totalResults / 20)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default News;
