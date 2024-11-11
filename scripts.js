// Playlist Data
const playlistData = [
  { title: 'YouTube Video 1', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'This is a music video featuring Rick Astley.', tags: 'music, pop', keys: ["math"] },
  { title: 'YouTube Video 2', videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', description: 'A tutorial on JavaScript basics for beginners.', tags: 'tutorial, programming', keys: ["physics"] },
  { title: 'YouTube Video 3', videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', description: 'A travel vlog showcasing beautiful destinations.', tags: 'travel, vlog' },
  { title: 'YouTube Video 4', videoUrl: 'https://www.youtube.com/watch?v=kZtIekgzcoQ', description: 'A cooking recipe tutorial for a quick meal.', tags: 'cooking, recipe' }
];

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/|(?:v|e(?:mbed)?)\/|(?:.*?[?&]v=))([^"&?\/\s]*))/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to populate the playlist with video items dynamically
function populatePlaylist(videos = playlistData) {
  const playlistContainer = document.getElementById('playlist');
  playlistContainer.innerHTML = ''; // Clear the playlist before repopulating

  videos.forEach(video => {
    const div = document.createElement('div');
    div.classList.add('playlist-item');
    div.setAttribute('data-title', video.title);
    div.setAttribute('data-tags', video.tags);
    div.onclick = () => changeVideo(video.videoUrl); // Use video URL directly
    div.innerHTML = `
      <img src="https://img.youtube.com/vi/${extractVideoId(video.videoUrl)}/0.jpg" alt="Video Thumbnail">
      <div>
        <h5>${video.title}</h5>
        <p>${video.description}</p>
        <i class="fas fa-play-circle"></i> Play Video
      </div>
    `;
    playlistContainer.appendChild(div);
  });
}

// Function to change the video when a playlist item is clicked
function changeVideo(videoUrl) {
  const videoId = extractVideoId(videoUrl); // Extract video ID from URL
  document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${videoId}`;
}

// Function to search through the videos based on title or tags
function searchVideos() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = '';  // Clear previous suggestions

  if (searchInput) {
    const matchingVideos = playlistData.filter(video =>
      video.title.toLowerCase().includes(searchInput) || video.tags.toLowerCase().includes(searchInput)
    );

    if (matchingVideos.length > 0) {
      matchingVideos.forEach(video => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = video.title;
        suggestionItem.onclick = () => {
          changeVideo(video.videoUrl);
          suggestionsList.style.display = 'none';
        };
        suggestionsList.appendChild(suggestionItem);
      });
      suggestionsList.style.display = 'block';
    } else {
      suggestionsList.style.display = 'none';
    }
  } else {
    suggestionsList.style.display = 'none';
  }
}

// Filter videos by category
function filterVideos(category) {
  const filteredVideos = playlistData.filter(video => video.keys && video.keys.includes(category));
  populatePlaylist(filteredVideos);
}

// Show all videos in the playlist
function showAllVideos() {
  populatePlaylist(playlistData);
}

// Initialize playlist on page load
window.onload = function() {
  populatePlaylist();
};

// Notification Data
const unreadMessages = [
  { title: "New Notification", content: "You have received a new message." },
{ title: "New Message", content: "You have received a new message." },
  { title: "Update Available", content: "A new update is available for your app." },
  { title: "Friend Request", content: "Someone sent you a friend request." }
];
const cacheName = "notification-v90km71";

// Initialize notification badge on load
document.addEventListener("DOMContentLoaded", function() {
  const lastSeenCacheName = localStorage.getItem("notificationCacheName");

  if (unreadMessages.length > 0 && lastSeenCacheName !== cacheName) {
    document.getElementById("badge").textContent = unreadMessages.length;
    document.getElementById("badge").style.display = "flex";
  } else {
    document.getElementById("badge").style.display = "none";
  }
});

// Function to show notification popup
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

// Function to close notification popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Attach event listener for notification button
document.getElementById("notificationBtn").addEventListener("click", openPopup);

// Initialize Bootstrap modal for welcome popup on load
window.addEventListener('load', function () { 
  const welcomePopup = new bootstrap.Modal(document.getElementById('welcomePopup'));
  welcomePopup.show();

  setTimeout(() => {
    welcomePopup.hide();
  }, 3000);
});