from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")

def test_logout_success():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10) 

    email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
    password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
    login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

    email.send_keys('test@test.com')
    password.send_keys('tester')
    login_button.click()

    WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/dashboard'))
    assert driver.current_url == 'https://peercode.net/dashboard', "Login failed"

    try:
        dropdown_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@aria-label="Open settings"]')))
        dropdown_button.click()

        # Wait for 'Logout' button within the dropdown to be clickable and click on it
        logout_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//li[.//p[text()="Logout"]]')))
        logout_button.click()
        
        WebDriverWait(driver, 10)

        h1_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h1"))
        )

        assert h1_element.text == "You are not signed in!"
    
    finally:
        driver.quit()