import telebot
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import logging
import threading

# Configurazione del logger
logging.basicConfig(level=logging.INFO)

API_TOKEN = '7556310797:AAEC_PeAeBUwTwyGxWHeJYsHeFE_hNaTWiM'  # Inserisci il tuo token Telegram
bot = telebot.TeleBot(API_TOKEN)

# Percorso del driver di Chrome specifico
chrome_driver_path = r"C:\Users\FedericaRizzo\Documents\Progetto_Sara\NGW 18+\chromedriver-win64\chromedriver-win64\chromedriver.exe"

# Funzione per avviare il driver di Selenium
def init_driver():
    servizio = Service(chrome_driver_path)
    opzioni = Options()
    opzioni.add_argument("--headless")  # Esegui il browser in modalità headless
    driver = Chrome(service=servizio, options=opzioni)
    return driver

def cerca_amazon(nome_prodotto):
    driver = init_driver()

    driver.get("https://www.amazon.it/?&tag=goitab-21&ref=pd_sl_781ozcfkw6_e&adgrpid=156928205950&hvpone=&hvptwo=&hvadid=672253294785&hvpos=&hvnetw=g&hvrand=5406006141482538022&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9181242&hvtargid=kwd-10573980&hydadcr=10841_2191052")

    time.sleep(2)

    def accetta_cookie():
        try:
            pulsante_cookie = driver.find_element(By.ID, "sp-cc-accept")
            pulsante_cookie.click()
            logging.info("Cookie accettati.")
        except NoSuchElementException:
            logging.error("Il tasto per l'accettazione dei cookie non è stato trovato.")
        except ElementClickInterceptedException:
            logging.error("Non è possibile cliccare sul pulsante dei cookie.")
        
    accetta_cookie()

    try:
        barra_di_ricerca = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
        )
        barra_di_ricerca.send_keys(nome_prodotto)
        barra_di_ricerca.send_keys(Keys.RETURN)
        logging.info("Ricerca eseguita con successo")
    except TimeoutException:
        logging.error("La barra di ricerca non è stata trovata entro il tempo limite")
        driver.quit()
        return []
    
    time.sleep(3)

    def clicca_filtro_se_esiste(testo_filtro):
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.LINK_TEXT, testo_filtro))
            )
            link_filtro = driver.find_element(By.LINK_TEXT, testo_filtro)
            link_filtro.click()
            logging.info(f"Filtro '{testo_filtro}' applicato correttamente")
        except (TimeoutException, NoSuchElementException, ElementClickInterceptedException):
            logging.info(f"Filtro '{testo_filtro}' non è presente o non cliccabile")

    clicca_filtro_se_esiste("Ricevi domani")

    time.sleep(3)

    def ottieni_dettagli_prodotti():
        prodotti = []
        try:
            contenitori_prodotti = driver.find_elements(By.CSS_SELECTOR, "div.a-section.a-spacing-base")
            for prodotto in contenitori_prodotti[:10]: 
                try:
                    titolo = prodotto.find_element(By.CSS_SELECTOR, "h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-4 a").text

                    try:
                        prezzo = prodotto.find_element(By.CSS_SELECTOR, "span.a-price-whole").text
                    except NoSuchElementException:
                        prezzo = "Prezzo non disponibile"
                    prodotti.append({'titolo': titolo, 'prezzo': prezzo})
                except NoSuchElementException:
                    logging.warning("Dettagli del prodotto non trovati")
        except NoSuchElementException:
            logging.error("Non sono stati trovati prodotti sulla pagina")

        return prodotti
    
    # Gestione dei comandi /start e /help
    @bot.message_handler(commands=['start', 'help'])
    def invia_benvenuto(message):
        bot.reply_to(message, "Ciao! Inviami il nome di un prodotto da cercare su Amazon.")
 
    # Gestione dei messaggi con testo
    @bot.message_handler(func=lambda message: True)
    def gestisci_messaggio(message):
        nome_prodotto = message.text
        bot.reply_to(message, f"Cerco '{nome_prodotto}' su Amazon, attendi...")
 
        # Esegui lo scraping su Amazon
        prodotti = cerca_amazon(nome_prodotto)
 
        if prodotti:
            for prodotto in prodotti:
                bot.send_message(message.chat.id, f"Prodotto: {prodotto['titolo']}\nPrezzo: {prodotto['prezzo']} €")
        else:
            bot.send_message(message.chat.id, "Non ho trovato nessun prodotto corrispondente.")
 
    # Funzione per eseguire il bot in un thread separato
    def esegui_bot():
        bot.infinity_polling()
 
    # Esegui il bot in un thread separato
    threading.Thread(target=esegui_bot).start()
