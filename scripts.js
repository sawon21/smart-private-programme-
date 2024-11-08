const videos = [
  { title: "Mathematics 2 | Chapter-13 | Naim vaiya", url: "https://www.facebook.com/61557552489666/videos/2623536554506330/?mibextid=rS40aB7S9Ucbxw6v", description: '1:33:43', thumbnail: "https://i.ibb.co.com/CwgrwBy/bible-study-classes-1730836630921.jpg", tags: ["math"] },
  { title: "Facebook Video 2", url: "https://www.facebook.com/facebook/videos/10153331379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["physics"] },
  { title: "Facebook Video 3", url: "https://www.facebook.com/facebook/videos/10153431379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["chemistry"] },
  { title: "Facebook Video 4", url: "https://www.facebook.com/facebook/videos/10153531379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["math", "physics"] },
  { title: "Facebook Video 5", url: "https://www.facebook.com/facebook/videos/10153631379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["chemistry", "math"] },
  { title: "Facebook Video 6", url: "https://www.facebook.com/facebook/videos/10153731379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["physics"] },
  { title: "Facebook Video 7", url: "https://www.facebook.com/facebook/videos/10153831379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["chemistry"] },
  { title: "Facebook Video 8", url: "https://www.facebook.com/facebook/videos/10153931379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["math"] },
  { title: "Facebook Video 9", url: "https://www.facebook.com/facebook/videos/10154031379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["physics"] },
  { title: "Facebook Video 10", url: "https://www.facebook.com/facebook/videos/10154131379946729/", description: 'This is a music video featuring Rick Astley.', thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["chemistry"] }
];

let currentVideoURL = videos[0].url;  // Track the current video URL

// Generate playlist from videos
function generatePlaylist(videosToShow = videos) {
  const playlistContainer = document.getElementById('playlist');
  playlistContainer.innerHTML = '';  // Clear existing playlist items

  videosToShow.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('playlist-item');
    videoItem.setAttribute('onclick', `changeVideo('${video.url}')`);

    videoItem.innerHTML = `
      <img src="${video.thumbnail}" alt="Video Thumbnail" />
      <div>
        <h6>${video.title}</h6>
        <p>${video.description}</p>
      </div>
    `;

    playlistContainer.appendChild(videoItem);
  });
}

// Change video in the player
function changeVideo(videoURL) {
  const iframe = document.getElementById('facebookVideoPlayer');
  const videoEmbedURL = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoURL)}`;
  
  iframe.src = videoEmbedURL;
  currentVideoURL = videoURL;  // Update the current video URL

  // Hide suggestions after selecting a video
  document.getElementById('suggestionsList').style.display = 'none';
}

// Filter videos by tag
function filterVideos(tag) {
  const filteredVideos = videos.filter(video => video.tags.includes(tag));
  generatePlaylist(filteredVideos);
}

// Show all videos in the playlist
function showAllVideos() {
  generatePlaylist(videos);
}

// Toggle full screen for the video wrapper
function toggleFullScreen() {
  const videoWrapper = document.getElementById('videoWrapper');
  if (videoWrapper.requestFullscreen) {
    videoWrapper.requestFullscreen();
  } else if (videoWrapper.mozRequestFullScreen) { // Firefox
    videoWrapper.mozRequestFullScreen();
  } else if (videoWrapper.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    videoWrapper.webkitRequestFullscreen();
  } else if (videoWrapper.msRequestFullscreen) { // IE/Edge
    videoWrapper.msRequestFullscreen();
  } else {
    alert("Full screen is not supported on this browser.");
  }
}

// Redirect to Facebook to watch the video
function watchOnFacebook() {
  if (currentVideoURL) {
    window.open(currentVideoURL, '_blank');
  } else {
    alert("No video is currently selected.");
  }
}

// Search videos based on the input
function searchVideos() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = ''; // Clear any previous suggestions

  if (searchInput === '') {
    suggestionsList.style.display = 'none';  // Hide suggestions if input is empty
    return;
  }

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchInput)
  );

  if (filteredVideos.length > 0) {
    suggestionsList.style.display = 'block';
    filteredVideos.forEach(video => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = video.title;
      suggestionItem.onclick = () => changeVideo(video.url);
      suggestionsList.appendChild(suggestionItem);
    });
  } else {
    suggestionsList.style.display = 'none';
  }
}

// Initialize the playlist on page load
window.onload = function() {
  generatePlaylist();
};
// Initialize Bootstrap modal when the page loads
window.addEventListener('load', function () {
  const welcomePopup = new bootstrap.Modal(document.getElementById('welcomePopup'));
  welcomePopup.show();

  // Auto-hide the modal after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    welcomePopup.hide();
  }, 3000);
});




//Change "notification-(...)" //
    const cacheName = "notification-v99fcv71";
    
    
  // notification Messages //
  
    const unreadMessages = [
      { title: "New Message", content: "Mehedi Al Hasan Sawon " },
      { title: "Update Available", content: "A new update is available for your app." },
      
      { title: "Update Available", content: "A new update is available for your app." },
      { title: "Friend Request", content: "Someone sent you a friend request." }
    ];

    document.addEventListener("DOMContentLoaded", function() {
      const lastSeenCacheName = localStorage.getItem("notificationCacheName");

      if (unreadMessages.length > 0 && lastSeenCacheName !== cacheName) {
        document.getElementById("badge").textContent = unreadMessages.length;
        document.getElementById("badge").style.display = "flex";
      } else {
        document.getElementById("badge").style.display = "none";
      }
    });

    function openPopup() {
      const popupMessagesContainer = document.getElementById("popupMessages");
      popupMessagesContainer.innerHTML = "";

      unreadMessages.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `<h3>${message.title}</h3><p>${message.content}</p>`;
        popupMessagesContainer.appendChild(messageDiv);
      });

      document.getElementById("popup").style.display = "block";
      document.getElementById("badge").style.display = "none";

      localStorage.setItem("notificationCacheName", cacheName);
    }

    function closePopup() {
      document.getElementById("popup").style.display = "none";
    }

    document.getElementById("notificationBtn").addEventListener("click", openPopup);