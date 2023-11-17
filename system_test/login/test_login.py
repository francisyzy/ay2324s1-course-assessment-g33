from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")


def test_login_success():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10) 

    try:
        email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
        password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

        email.send_keys('test@test.com')
        password.send_keys('tester')
        login_button.click()

        # Wait for the next page to load after login (change the expected condition based on the next page)
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/dashboard'))
        assert driver.current_url == 'https://peercode.net/dashboard', "Login failed"
    finally:
        driver.quit()

def test_login_failure():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10) 

    try:
        email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
        password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

        email.send_keys('invalid@invalid.com')
        password.send_keys('invalid') 
        login_button.click()

        snackbar = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-186hw1j']")))
        assert snackbar.text == 'Invalid login credentials', "Login failed"

        # Wait for the next page to load after login
        WebDriverWait(driver, 10)
        assert driver.current_url == 'https://peercode.net/login'

    finally:
        driver.quit()

def test_redirect_to_signup():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10)

    try:
        # Locate the 'New member? Click here!' link and click it
        new_member_link = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@class='forgot-password']/div/span")))
        
        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", new_member_link)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", new_member_link)

        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/signup'))

        assert driver.current_url == 'https://peercode.net/signup', "Redirect to /signup failed" 
    finally:
        driver.quit()