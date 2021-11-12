// 防止Microbit面版閃燈
led.enable(false)
let tm = TM1637.create(
DigitalPin.P7,
DigitalPin.P4,
7,
4
)
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P15,
true,
false,
true
)
let strip = neopixel.create(DigitalPin.P13, 1, NeoPixelMode.RGB)
basic.forever(function () {
    tm.showNumber(pins.analogReadPin(AnalogPin.P10))
    basic.pause(1000)
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    if (DS1307.getHour() == 8) {
        if (DS1307.getMinute() == 10) {
            if (DS1307.getSecond() < 5) {
                // 小心類比訊號與數位訊號分別
                pins.analogWritePin(AnalogPin.P1, 500)
            }
        }
    }
    // 光敏電阻，需再進行課室測驗
    if (pins.analogReadPin(AnalogPin.P10) < 120) {
        pins.servoWritePin(AnalogPin.P11, 30)
    } else {
        pins.servoWritePin(AnalogPin.P11, 90)
    }
})
