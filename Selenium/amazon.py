from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
import time

logging.basicConfig(level=logging.INFO)

chrome_driver_path = r"C:\Users\franc\Desktop\chromedriver-win64\chromedriver.exe"

service = Service(chrome_driver_path)

options = Options()

driver = Chrome(service=service, options=options)

try:
    driver.get("https://www.amazon.it")

    time.sleep(2) 
    try:
        accettazione_cookie = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Accetta')]"))
        )
        accettazione_cookie.click()
        logging.info("Cookie accettati.")
    except TimeoutException:
        logging.error("Timeout: non è stato possibile cliccare sul pulsante dei cookie.")

    barra_ricerca = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
    )
    barra_ricerca.send_keys("smartphone") 
    barra_ricerca.send_keys(Keys.RETURN)

    time.sleep(3) 

    prodotti = driver.find_elements(By.CSS_SELECTOR, ".s-main-slot .s-result-item")

    for prodotto in prodotti:
        try:
            titolo = prodotto.find_element(By.CSS_SELECTOR, "h2 .a-link-normal").text
            prezzo = prodotto.find_element(By.CSS_SELECTOR, ".a-price .a-offscreen").text
            descrizione = prodotto.find_element(By.CSS_SELECTOR, ".a-text-normal").text
            
            logging.info(f"Prodotto: {titolo}, Prezzo: {prezzo}, Descrizione: {descrizione}")
        except NoSuchElementException:
            continue 

finally:
    driver.quit()  
