import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import { MDBRow } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "@fontsource/roboto/400.css";
import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Skeleton } from "@mui/material";
import { LoadingBarProvider } from "./contexts/toLoadingBar";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [apidata, setApiData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const skeleton = [];

  const liveData = () => {
    fetch(`https://inshortsapi.vercel.app/news?category=${filter}`)
      .then((result) => {
        setProgress(50);
        return result.json();
      })
      .then((response) => {
        const apidata = response.data;
        setApiData(apidata);
        setProgress(100);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    liveData();
  }, [filter]);

  return (
    <LoadingBarProvider value={{ progress, setProgress }}>
      <div className="App">
        <div className="nav-item">
          <h1>
            <Container>
              <LoadingBar
                color="#f11946"
                progress={progress}
                shadow={true}
                onLoaderFinished={() => setProgress(0)}
              />
              <Navbar expand="lg" className="bg-body-tertiary">
                <Container
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Navbar.Brand href="#">News Web - Portal</Navbar.Brand>
                </Container>
              </Navbar>
            </Container>
          </h1>
        </div>

        {isLoading ? (
          <>
            <Skeleton
              className="container-fluid"
              animation="wave"
              variant="rectangular"
              width={1500}
              height={650}
            />
            <Skeleton
              className="filter-item"
              animation="wave"
              variant="rectangular"
              // width={1500}
              height={75}
            />
          </>
        ) : (
          <>
            <Carousel className="top container-fluid">
              {apidata.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.imageUrl}
                      alt={index}
                      width={650}
                      height={650}
                    />
                    <Carousel.Caption>
                      <h5>{item.title}</h5>
                      <p>{item["content"].slice(0, 200)}...</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className="filter-item">
              <Button
                className="box"
                variant="contained"
                value="all"
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
              >
                All
              </Button>
              <Button
                className="box"
                variant="contained"
                value="politics"
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
              >
                Politics
              </Button>
              <Button
                className="box"
                variant="contained"
                value="sports"
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
              >
                Sports
              </Button>
              <Button
                className="box"
                variant="contained"
                value="science"
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
              >
                Science
              </Button>
            </div>
            <MDBRow className="row row-cols-1 row-cols-md-3 g-4 ">
              {apidata.map((item, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt=""
                        width="496px"
                        height="279px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item["title"]}</h5>
                        <p className="card-text">{item.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </MDBRow>
          </>
        )}
      </div>
    </LoadingBarProvider>
  );
}

export default App;
