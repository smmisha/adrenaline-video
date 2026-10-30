# Тексты озвучки и образец голоса — общие для clone-voice.py и clone-voice-local.py
REF = r"C:\Users\Michael\Downloads\Очищенные_записи_голоса\michael_rec_01.mp3"
REF_TEXT = ("Сегодня обычный день, но даже в самых простых событиях можно найти "
            "что-то интересное. Иногда достаточно остановиться на минуту и "
            "внимательно посмотреть вокруг.")
SCENES = {
    "ru": [
        "Сердце колотится. Ладони потеют. Время будто замедляется. Это — адреналин.",
        "Мозг замечает опасность и шлёт сигнал по нервам прямо к надпочечникам, которые сидят над почками.",
        "Надпочечники выбрасывают адреналин в кровь. Эффект наступает уже через несколько секунд.",
        "Сердце бьётся чаще и сильнее. Бронхи расширяются, и в кровь попадает больше кислорода. Зрачки расширяются. Мышцы получают кровь и глюкозу — то есть энергию.",
        "Тело готово к реакции: бей, беги или замри. Всё лишнее, например пищеварение, ставится на паузу.",
        "Опасность позади, и гормон распадается за считанные минуты. Остаются дрожь в руках и внезапная усталость. Так тело спасает тебя за секунды.",
    ],
    "uk": [
        "Серце шалено б'ється. Долоні пітніють. Час ніби сповільнюється. Це — адреналін.",
        "Мозок помічає небезпеку й надсилає сигнал нервами прямо до наднирників, які сидять над нирками.",
        "Наднирники викидають адреналін у кров. Ефект з'являється вже за кілька секунд.",
        "Серце б'ється частіше й сильніше. Бронхи розширюються, і в кров потрапляє більше кисню. Зіниці розширюються. М'язи отримують кров і глюкозу — тобто енергію.",
        "Тіло готове до реакції: бий, тікай або завмри. Усе зайве, наприклад травлення, ставиться на паузу.",
        "Небезпека позаду, і гормон розпадається за лічені хвилини. Залишаються дрож у руках і раптова втома. Так тіло рятує тебе за секунди.",
    ],
    "en": [
        "Heart pounding. Palms sweating. Time slowing down. That's adrenaline.",
        "Your brain spots danger and signals the adrenal glands, right above your kidneys.",
        "The adrenal glands release adrenaline into your blood. It kicks in within seconds.",
        "Your heart beats faster and harder. Your airways open up, letting in more oxygen. Your pupils dilate. Your muscles get blood and glucose — in other words, energy.",
        "Your body is ready to react: fight, flight, or freeze. Anything non-essential, like digestion, is put on hold.",
        "Once the danger passes, the hormone breaks down within minutes. What's left is shaky hands and sudden fatigue. That's how your body saves you in seconds.",
    ],
}
LANG_NAME = {"ru": "Russian", "uk": "Ukrainian", "en": "English"}

