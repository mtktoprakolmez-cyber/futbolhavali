// Özel Türlerin Tanımlanması
namespace SpriteKind {
    export const Obstacle = SpriteKind.create()
    export const SkorTabelasi = SpriteKind.create()
    export const MenuElemani = SpriteKind.create()
}

// Takım Yapısı ve 10 Takımlı Liste
interface Takim {
    isim: string;
    renk: number;
}

let takimlar: Takim[] = [
    { isim: "Galatasaray", renk: 2 },
    { isim: "Fenerbahce", renk: 8 },
    { isim: "Besiktas", renk: 15 },
    { isim: "Trabzonspor", renk: 11 },
    { isim: "Barcelona", renk: 4 },
    { isim: "Real Madrid", renk: 1 },
    { isim: "Man City", renk: 9 },
    { isim: "Bayern Munih", renk: 10 },
    { isim: "PSG", renk: 13 },
    { isim: "Liverpool", renk: 5 }
]

let secilenTakim1: Takim = takimlar[0]
let secilenTakim2: Takim = takimlar[1]
let skor1 = 0
let skor2 = 0

// Görsel Menü Değişkenleri
let suAnkiSecimIdx = 0
let hangiOyuncuSeciyor = 1
let menuYazisi: Sprite = null

// Oyun Nesneleri
let solKale: Sprite = null
let sagKale: Sprite = null
let skorTablosu: Sprite = null
let oyuncu1: Sprite = null
let oyuncu2: Sprite = null
let top: Sprite = null
let oyunBasladi = false

// GÖRSEL TAKIM SEÇİM EKRANI FONKSİYONU
function menuGoster() {
    scene.setBackgroundColor(11) // Menü için mavi arka plan

    menuYazisi = sprites.create(image.create(160, 40), SpriteKind.MenuElemani)
    menuYazisi.setPosition(80, 60)
    menuGuncelle()
}

function menuGuncelle() {
    menuYazisi.image.fill(0)
    let baslik = "OYUNCU " + hangiOyuncuSeciyor + " TAKIM SECIN"
    let takimIsim = "< " + takimlar[suAnkiSecimIdx].isim + " >"

    // Menü metinlerini standart font (image.font5) ve beyaz renk (1) ile çiz
    menuYazisi.image.printCenter(baslik, 5, 1, image.font5)
    menuYazisi.image.printCenter(takimIsim, 20, 5, image.font5)
    menuYazisi.image.printCenter("[A]: Degistir [B]: Onayla", 32, 9, image.font5)
}

// Buton Kontrolleri (Menü ve Oyun İçin)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!oyunBasladi) {
        // Sonraki takıma geç
        suAnkiSecimIdx = (suAnkiSecimIdx + 1) % takimlar.length
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        menuGuncelle()
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!oyunBasladi) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        if (hangiOyuncuSeciyor == 1) {
            secilenTakim1 = takimlar[suAnkiSecimIdx]
            hangiOyuncuSeciyor = 2
            suAnkiSecimIdx = (suAnkiSecimIdx + 1) % takimlar.length // 2. oyuncu farklı başlasın
            menuGuncelle()
        } else {
            secilenTakim2 = takimlar[suAnkiSecimIdx]
            // İki oyuncu da seçti, menüyü temizle ve oyunu başlat
            menuYazisi.destroy()
            anaOyunuBaslat()
        }
    }
})

// ANA OYUN KURULUMU
function anaOyunuBaslat() {
    oyunBasladi = true
    scene.setBackgroundColor(7) // Yeşil saha

    // Büyütülmüş Kaleler
    solKale = sprites.create(img`
        . f f f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f f f .
    `, SpriteKind.Obstacle)
    solKale.setPosition(8, 60)

    sagKale = sprites.create(img`
        . f f f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f . f .
        . f f f .
    `, SpriteKind.Obstacle)
    sagKale.setPosition(152, 60)

    // Oyuncular
    oyuncu1 = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f e e f f d d f f e e f . . 
        . . f e f d d d d d d f e f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d f d d d d f d d f . . 
        . . f d d f d d d d f d d f . . 
        . . . f d d d d d d d d f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)

    oyuncu2 = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f e e f f d d f f e e f . . 
        . . f e f d d d d d d f e f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d f d d d d f d d f . . 
        . . f d d f d d d d f d d f . . 
        . . . f d d d d d d d d f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)

    formaRenginiAyarla(oyuncu1, secilenTakim1.renk)
    formaRenginiAyarla(oyuncu2, secilenTakim2.renk)

    oyuncu1.setPosition(40, 60)
    oyuncu1.setStayInScreen(true)
    controller.moveSprite(oyuncu1, 75, 75)

    oyuncu2.setPosition(120, 60)
    oyuncu2.setStayInScreen(true)
    controller.player2.moveSprite(oyuncu2, 75, 75)

    // Top
    top = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f 1 1 f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 1 f 1 1 f . . 
        . . f 1 f 1 1 f f 1 1 f 1 f . . 
        . f 1 1 f 1 f 1 1 f 1 f 1 1 f . 
        . f 1 1 f 1 f 1 1 f 1 f 1 1 f . 
        . f 1 1 f 1 f 1 1 f 1 f 1 1 f . 
        . f 1 1 f 1 f 1 1 f 1 f 1 1 f . 
        . . f 1 f 1 1 f f 1 1 f 1 f . . 
        . . f 1 1 f 1 1 1 1 f 1 1 f . . 
        . . . f 1 1 f f f f 1 1 f . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . . . . f f f f . . . . . . 
    `, SpriteKind.Projectile)
    top.setPosition(80, 60)
    top.vx = 0
    top.vy = 0

    // Skor Tabelası
    skorTablosu = sprites.create(image.create(140, 15), SpriteKind.SkorTabelasi)
    skorTablosu.setPosition(80, 10)
    skoruGuncelle()
}

function skoruGuncelle() {
    skorTablosu.image.fill(0)
    let metin = secilenTakim1.isim + ": " + skor1 + " - " + skor2 + " :" + secilenTakim2.isim
    skorTablosu.image.printCenter(metin, 2, 1, image.font5)
}

// Oyuncu ve Top Fizikleri
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (!oyunBasladi) return
    otherSprite.vx = (otherSprite.x - sprite.x) * 6
    otherSprite.vy = (otherSprite.y - sprite.y) * 6
})

// Sürtünme ve KÖŞELERDEN/DUVARLARDAN SEKMESİ
game.onUpdate(function () {
    if (!oyunBasladi) return
    top.vx = top.vx * 0.96
    top.vy = top.vy * 0.96

    if (top.x <= 4) { top.x = 4; top.vx = -top.vx * 0.8; }
    if (top.x >= 156) { top.x = 156; top.vx = -top.vx * 0.8; }
    if (top.y <= 4) { top.y = 4; top.vy = -top.vy * 0.8; }
    if (top.y >= 116) { top.y = 116; top.vy = -top.vy * 0.8; }
})

// Gol Algılama
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Obstacle, function (sprite, otherSprite) {
    if (!oyunBasladi) return
    if (otherSprite == sagKale) {
        skor1 += 1
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        game.splash(secilenTakim1.isim + " GOL ATTI!")
        pozisyonlariSifirla()
    } else if (otherSprite == solKale) {
        skor2 += 1
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        game.splash(secilenTakim2.isim + " GOL ATTI!")
        pozisyonlariSifirla()
    }
})

function pozisyonlariSifirla() {
    top.setPosition(80, 60)
    top.vx = 0
    top.vy = 0
    oyuncu1.setPosition(40, 60)
    oyuncu2.setPosition(120, 60)
    skoruGuncelle()

    if (skor1 >= 5) {
        game.setGameOverMessage(true, "Sampiyon " + secilenTakim1.isim + "!")
        game.gameOver(true)
    } else if (skor2 >= 5) {
        game.setGameOverMessage(true, "Sampiyon " + secilenTakim2.isim + "!")
        game.gameOver(true)
    }
}

function formaRenginiAyarla(oyuncuSprite: Sprite, renkKodu: number) {
    let img = oyuncuSprite.image
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            if (img.getPixel(x, y) == 5) {
                img.setPixel(x, y, renkKodu)
            }
        }
    }
}

// Oyunu Menüyle Başlat
menuGoster()
