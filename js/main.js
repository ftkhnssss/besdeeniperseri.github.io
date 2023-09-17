$(document).ready(function() {
    // Process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    document.getElementById('titleWeb').innerHTML = CONFIG.titleWeb
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)

    var xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
    var xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
    var y = 0.75 * $(window).height();
    $('#yes').css("left", xYes);
    $('#yes').css("top", y);

    $('#no').css("left", xNo);
    $('#no').css("top", y);
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/logi.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
    }).then(function() {
        $('.content').show(200);
        var audio = new Audio('sound/sound.mp3');
        audio.play();
    })
}

// Switch button position
function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNo = $('#no').css("top");
    var leftYes = $('#yes').css("left");
    var topYes = $('#yes').css("top");
    $('#no').css("left", leftYes);
    $('#no').css("top", topYes);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNo);
}

// Move random button position
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init();

var n = 0;
$('#no').mousemove(function() {
    if (Math.random() < 0.5 || n == 1)
        switchButton();
    else
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
})

// Generate text in input
function textGenerate() {
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var n = "";

    if (textVal.length > 0) {
        n = textVal.substring(0);

        // Set ulang nilai elemen "txtReason" hanya jika teks telah diproses sepenuhnya
        if (n.length === 0) {
            $('#txtReason').val("");
        }
    }

    setTimeout(textGenerate, 1000); // Menjalankan ulang fungsi setiap 1 detik
}

// Panggil fungsi textGenerate untuk memulai efek penghilangan
textGenerate();


// Show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})

// Fungsi untuk mengambil jawaban pengguna dan mengganti "reply"
function updateReply() {
    const userReply = document.getElementById('txtReason').value;
    CONFIG.reply = userReply;
}

// Menambahkan event listener untuk mengupdate "reply" saat pengguna menekan Enter
document.getElementById('txtReason').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        updateReply();
    }
});
