// Playlist Data
const playlistData = [
  { title: 'জটিল সংখ্যা - Complex Number One Shot Revision Class', videoUrl: 'https://youtu.be/zO6c19pXd4U?si=NE_JMkJyLlqRl4X_', description: 'This is a music video featuring Rick Astley.', tags: 'জটিল, Math 2nd paper', keys: ["math"] },
  { title: 'সরলরেখা লেকচার ১ || HSC 24 |', videoUrl: 'https://youtu.be/bFi4-29-8W8?si=zvq0YKMgVryKzO-h', description: 'A tutorial on JavaScript basics for beginners.', tags: 'Abhi vai, HSC Math', keys: ["math"] },
  { title: 'CHEMISTRY || পরিমানগত রসায়ন', videoUrl: 'https://youtu.be/pwEd10NuNgo?si=jIoNG-rDXS8I1SAW', description: 'A tutorial on JavaScript basics for beginners.', tags: 'CHEMISTRY, HSC', keys: ["chemistry"] },
  { title: 'ভেক্টর Introduction and topics of the Chapter | vector hsc 1st', videoUrl: 'https://youtu.be/WVKJCfRw6wA?si=QG_WhbZcQFg5zryD', description: 'A travel vlog showcasing beautiful destinations.', tags: 'ভেক্টর, apurbo ', keys: ["physics"]},
  { title: 'Somoy tv', videoUrl: 'https://www.youtube.com/live/-EkNyHXVqBw?si=0Sez5abyMb3BrcQo', description: 'A cooking recipe tutorial for a quick meal.', tags: 'news, tv', keys: ["live"] }
];

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
  const regexPatterns = [
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/|(?:v|e(?:mbed)?)\/|(?:.*?[?&]v=))([^"&?\/\s]{11}))/,
    /(?:https?:\/\/(?:www\.)?youtu\.be\/)([^"&?\/\s]{11})/,
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/|(?:e(?:mbed)?)\/)([^"&?\/\s]{11}))/ // Embed URL format
  ];

  // Loop through regex patterns to match the video ID
  for (let i = 0; i < regexPatterns.length; i++) {
    const match = url.match(regexPatterns[i]);
    if (match) {
      return match[1];
    }
  }
  return null; // Return null if no match is found
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

      </div>
    `;
    playlistContainer.appendChild(div);
  });
}

// Function to change the video when a playlist item is clicked
function changeVideo(videoUrl) {
  const videoId = extractVideoId(videoUrl); // Extract video ID from YouTube URL
  if (videoId) {
    document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    alert('Invalid or unsupported video URL');
  }
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
  { 
    title: "New Message", 
    content: "You have received a new message.",
    imageUrl: "https://i.ibb.co.com/gW7qWKt/virtual-Sunday-service-1731017016115.jpg" // Example image URL, optional
  },
  { 
    title: "Update Available", 
    content: "A new update is available for your app.", 
    link: "https://spp-test-app.netlify.app/" , // Link for Update available
    imageUrl: "https://i.ibb.co.com/0yp4H4w/Online-Cooking-Classes-1731142660436.jpg"
  },
  { 
    title: "Friend Request", 
    content: "Someone sent you a friend request.", 
    link: "/friends" // Link for Friend Request
  }
];
const cacheName = "notification-vfrhr8c71";

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

// Function to show notification popup with image and link handling
function openPopup() {
  const popupMessagesContainer = document.getElementById("popupMessages");
  popupMessagesContainer.innerHTML = ""; // Clear existing messages

  unreadMessages.forEach(message => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    // Check if there's an image and display it
    if (message.imageUrl) {
      messageDiv.innerHTML = `
        <h3>${message.title}</h3>
        <p>${message.content}</p>
        <img src="${message.imageUrl}" alt="Notification Image" class="message-img">
      `;
    } else {
      messageDiv.innerHTML = `
        <h3>${message.title}</h3>
        <p>${message.content}</p>
      `;
    }

    // Check if there's a link
    if (message.link) {
      messageDiv.innerHTML += `
        <a href="${message.link}" class="notification-link" target="_blank">Go to ${message.title}</a>
      `;
    }

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