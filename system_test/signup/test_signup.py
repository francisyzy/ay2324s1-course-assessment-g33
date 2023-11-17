from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")
'''
def test_signup_successful():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('http://localhost:3000/signup')
    wait = WebDriverWait(driver, 10)

    try:
        username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        password = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, "confirmPassword")))
        sign_up_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign Up']")))

        # Fill in the registration form
        username.send_keys('testing')
        email.send_keys('testing@test.com')
        password.send_keys('testing')
        confirm_password.send_keys('testing')  # Fill in the password confirmation

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", sign_up_button)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", sign_up_button)

        # Wait for the success message or redirect
        WebDriverWait(driver, 10).until(EC.url_to_be('http://localhost:3000/login'))

        assert driver.current_url == 'http://localhost:3000/login', "Sign-up failed"

        email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
        password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

        email.send_keys('testing@test.com')
        password.send_keys('testing')
        login_button.click()

        # Wait for the next page to load after login (change the expected condition based on the next page)
        WebDriverWait(driver, 10).until(EC.url_to_be('http://localhost:3000/'))
        assert driver.current_url == 'http://localhost:3000/', "Login failed"

    finally:
        driver.quit()

def test_signup_failure_email_in_use():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('http://localhost:3000/signup')
    wait = WebDriverWait(driver, 10)

    try:
        username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        password = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, "confirmPassword")))
        sign_up_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign Up']")))

        # Fill in the registration form
        username.send_keys('test')
        email.send_keys('test@test.com')
        password.send_keys('tester')
        confirm_password.send_keys('tester')  # Fill in the password confirmation

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", sign_up_button)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", sign_up_button)

        snackbar = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-zzms1-MuiSnackbar-root']")))
        assert snackbar.text == 'Email is already in use', "Snackbar Text mismatch"
        
        # Wait for the success message or redirect
        WebDriverWait(driver, 10).until(EC.url_to_be('http://localhost:3000/signup'))

        assert driver.current_url == 'http://localhost:3000/signup', "URL mismatch"
    finally:
        driver.quit()
'''
def test_signup_failure_password_mismatch():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/signup')
    wait = WebDriverWait(driver, 10)

    try:
        username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        password = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, "confirmPassword")))
        sign_up_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign Up']")))

        # Fill in the registration form
        username.send_keys('testing')
        email.send_keys('testing@testing.com')
        password.send_keys('testing')
        confirm_password.send_keys('testing1')  # Fill in the password confirmation

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", sign_up_button)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", sign_up_button)

        snackbar = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-186hw1j']")))
        assert snackbar.text == 'Password mismatched', "Snackbar Text mismatch"

        # Wait for the success message or redirect
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/signup'))

        assert driver.current_url == 'https://peercode.net/signup', "URL mismatch"
    finally:
        driver.quit()

def test_signup_failure_existing_user():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/signup')
    wait = WebDriverWait(driver, 10)

    try:
        username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        password = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, "confirmPassword")))
        sign_up_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign Up']")))

        # Fill in the registration form
        username.send_keys('testing')
        email.send_keys('test@test.com')
        password.send_keys('testing1!')
        confirm_password.send_keys('testing1!')  # Fill in the password confirmation

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", sign_up_button)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", sign_up_button)

        snackbar = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-186hw1j']")))
        assert snackbar.text == 'Email is already in use', "Snackbar Text mismatch"

        # Wait for the success message or redirect
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/signup'))

        assert driver.current_url == 'https://peercode.net/signup', "URL mismatch"
    finally:
        driver.quit()

def test_signup_failure_insecure_pwd():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/signup')
    wait = WebDriverWait(driver, 10)

    try:
        username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        password = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, "confirmPassword")))
        sign_up_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign Up']")))

        # Fill in the registration form
        username.send_keys('invalid')
        email.send_keys('invalid@invalid.com')
        password.send_keys('test')
        confirm_password.send_keys('test')  # Fill in the password confirmation

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", sign_up_button)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", sign_up_button)

        snackbar = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-186hw1j']")))
        assert snackbar.text == 'Password must have at least 1 number and 1 non-alphanumeric character', "Snackbar Text mismatch"

        # Wait for the success message or redirect
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/signup'))

        assert driver.current_url == 'https://peercode.net/signup', "URL mismatch"
    finally:
        driver.quit()