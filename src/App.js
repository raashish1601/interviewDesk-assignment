import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Avatar, Button } from "@mui/material";

function InstagramPage() {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [numPosts, setNumPosts] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);

  useEffect(() => {
    // Fetch user information
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch photos
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Grid container className="instagram-page">
      <Grid item xs={12}>
        {/* Display user information */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar src={user.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="subtitle1">{user.username}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={isFollowing ? "secondary" : "primary"}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button variant="contained" color="primary">
              Message
            </Button>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="subtitle2">{numPosts} posts</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {numFollowers} followers
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {numFollowing} following
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {/* Display photos grid */}
        <Grid container spacing={2}>
          {photos.map((photo) => (
            <Grid key={photo.id} item xs={4}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InstagramPage;
