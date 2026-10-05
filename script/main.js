document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Tap anywhere, okay?",
    "hey you <3",
    "I want to tell you something",
    "try pressing it",
    "press again",
    "come on, keep pressing",
    "I promise this is the last one",
    "seriously",
    "this",
    "is",
    "the last one",
    "but I lied hehe, let's keep going",
    "I know you're probably annoyed",
    "hmm",
    "alright then",
    "actually",
    "I just wanted to say",
    "I went to the market to buy shrimp paste, then came home and ate a lizard",
    "i love you <3",
    "oh my goodness",
    "try pressing the button below <3"
];

const reactions = [
    "hehe",
    "wait for it",
    "almost there",
    "don't roll your eyes 😭"
];

let currentPage = 0;
let isLastPage = false;
let reactionIndex = 0;

const messageMedia = {
    "Tap anywhere, okay?": { type: "image", src: "assets/tap anywere.jpg" },
    "I want to tell you something": { type: "image", src: "assets/Suspense stare.jpg" },
    "come on, keep pressing": { type: "image", src: "assets/Motivational coach meme.gif" },
    "I promise this is the last one": { type: "video", src: "assets/Suspicious side-eye.mp4" },
    "seriously": { type: "image", src: "assets/Serious face  zoom-in.jpg" },
    "but I lied hehe, let's keep going": { type: "image", src: "assets/Evil laugh  mischievous smile.jpg" },
    "I know you're probably annoyed": { type: "image", src: "assets/Cryinglaughing apology meme.jpg" },
    "alright then": { type: "image", src: "assets/Surrender  okay fine meme.jpg" },
    "actually": { type: "image", src: "assets/Wait...” dramatic reveal.jpg" },
    "I just wanted to say": { type: "image", src: "assets/Nervous sweating meme.jpg" },
    "I went to the market to buy shrimp paste, then came home and ate a lizard": { type: "image", src: "assets/Random cursedfunny image.jpg" },
    "i love you <3": { type: "image", src: "assets/ily.jpg" },
    "oh my goodness": { type: "image", src: "assets/Shocked face.jpg" },
    "try pressing the button below <3": { type: "video", src: "assets/Pin on Mood pics.mp4" }
};

function showMessage() {
    const message = messages[currentPage];
    const media = messageMedia[message];
    const image = document.querySelector('.message-image');
    const video = document.querySelector('.message-video');

    $('.message').text(message);

    if (image) {
        image.classList.remove('show');
        image.removeAttribute('src');
    }

    if (video) {
        video.classList.remove('show');
        video.pause();
        video.removeAttribute('src');
        video.load();
    }

    if (media && media.type === "image" && image) {
        image.src = media.src;
        image.classList.add('show');
    }

    if (media && media.type === "video" && video) {
        video.src = media.src;
        video.classList.add('show');
        video.play().catch(error => console.log('Video autoplay prevented', error));
    }

    isLastPage = currentPage === messages.length - 1;

    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

function showReaction(event) {
    const reaction = $('<span class="reaction-pop"></span>');
    reaction.text(reactions[reactionIndex]);
    reactionIndex = (reactionIndex + 1) % reactions.length;

    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;

    reaction.css({
        left: x + 'px',
        top: y + 'px'
    });

    $('body').append(reaction);

    setTimeout(function() {
        reaction.remove();
    }, 1200);
}

$('.bg_heart').on('click', function(event) {
    if (!isLastPage) {
        showReaction(event);
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");

    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");

    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState();
};

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    if (!music) return;
    music.volume = 0.8;

    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    function startMusic() {
        music.play().then(() => {
            localStorage.setItem('musicPlaying', 'true');
            removeMusicStartListeners();
        }).catch(error => {
            console.log('Autoplay prevented', error);
        });
    }

    function removeMusicStartListeners() {
        document.removeEventListener('pointerdown', startMusic);
        document.removeEventListener('touchstart', startMusic);
        document.removeEventListener('click', startMusic);
    }

    document.addEventListener('pointerdown', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('click', startMusic);
}

document.addEventListener('DOMContentLoaded', setupMusic);
