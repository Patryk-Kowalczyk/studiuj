import {Box} from "@material-ui/core";
import {fourthContentStyles, BackgroundIcons} from "./styles";
import FlipCard from "./FlipCard";
import React from "react";
import {
    FaMoneyBillWaveAlt,
    FaHeadset,
    FaRegCalendarTimes,
    FaRegCreditCard,
    FaUserTimes,
    FaMoneyCheckAlt,
    FaMicrophone,
    FaUsers,
    FaReceipt,
    FaInfo,
} from "react-icons/fa";


const Cards = {
    money: {
        icon: FaMoneyBillWaveAlt,
        text: "Czy korzystanie z serwisu jest płatne?",
        bool: "NIE",
        backText: "Posiadanie konta w serwisie jest darmowe, tak samo jak korzystanie z forum. ",
    },
    users: {
        icon: FaUsers,
        text: "Jak wygląda korzystanie z forum?",
        bool: "Jest intuicyjne",
        backText: "Użytkownicy mogą poruszać się po odpowiednich przedmiotach i zagadnieniach. Zadawać pytania oraz odpowiadać.",
    },
    form: {
        icon: FaReceipt,
        text: "Czy dodanie ogłoszenia jest darmowe?",
        bool: "Tak",
        backText: "Wszystkie ogłoszenia, pytania i posty nie są objęte żadnymi opłatami",
    },
    what: {
        icon: FaHeadset,
        text: "Czy mikrofon lub kamera są wymagane?",
        bool: "Standardowo, nie jednak ...",
        backText: "Występują przypadki, że korepetytor z góry wyznaczy wymagany sprzęt jednak wszystko jest zawarte w ogłoszeniu.",
    },
    away: {
        icon: FaRegCalendarTimes,
        text: "Czy mogę odwołać zajęcia?",
        bool: "Tak, jednak ...",
        backText: "w terminie do 5dni odwołanie jest darmowe, od 5-3dni (15% ceny) 2-1(25% ceny), w dzień zajęć (50% ceny). Podane kwoty trafią na konto korepetytora.",
    },
    cash: {
        icon: FaRegCreditCard,
        text: "Jestem korepetytorem, kiedy wypłata?",
        bool: "14dni po zakońcoznych zajęciach",
        backText: "W tym czasie analizujemy wszelkie skargi i reklamacje. ",
    },
    times: {
        icon: FaUserTimes,
        text: "Korepetytor nie wstawił sie na zajęcia?",
        bool: "Otrzymasz od nas rekompensatę w postaci...",
        backText: "kuponu rabatowego na kolejne zajęcia. Korepetytor poniesie koszty jego realizacji.",
    },
    provision: {
        icon: FaMoneyCheckAlt,
        text: "Czy korepetytor płaci prowizję?",
        bool: "Tak",
        backText: "Wynosi ona 5%, minimalna wartość to 5zł.",
    },
    micro: {
        icon: FaMicrophone,
        text: "W jaki sposób i gdzie odbywają zajęcia?",
        bool: "Odbywają się na platformie",
        backText: "Użytkownik ma mozliwość połączenia głosowego oraz poprzez czat.",
    },
    info: {
        icon: FaInfo,
        text: "Nie ma tutaj mojego pytania",
        bool: "Nic straconego!",
        backText: "Skontaktuj się z nami poprzez chatbota lub wyślij wiadomość email na adres: sample@mail.com",
    },
}


export default function FourthContent() {
    const classes = fourthContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <span className={classes.p}>#faq</span>
                <h1 className={classes.h1}> Najczęsciej zadawane <span className={classes.span}>pytania</span></h1>
                <FlipCard component={Cards.money}/>
                <FlipCard component={Cards.users}/>
                <FlipCard component={Cards.form}/>
                <FlipCard component={Cards.micro}/>
                <FlipCard component={Cards.away}/>
                <FlipCard component={Cards.what}/>
                <FlipCard component={Cards.times}/>
                <FlipCard component={Cards.provision}/>
                <FlipCard component={Cards.cash}/>
                <FlipCard component={Cards.info}/>

                <div className={classes.margin}/>
                <BackgroundIcons none/>
            </Box>
        </Box>
    )
}
