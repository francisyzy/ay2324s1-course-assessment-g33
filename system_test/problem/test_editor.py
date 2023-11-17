from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")

def test_editor_solutions_panel_success():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10)
    try:
        # Login
        email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
        password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

        email.send_keys('test@test.com')
        password.send_keys('tester')
        login_button.click()

        # Wait for the next page to load after login
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/dashboard'))
        assert driver.current_url == 'https://peercode.net/dashboard', "Login failed"

        # Find and click the 'Two Sum' element
        two_sum_element = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@class='title-div' and text()='Two Sum']")))
        two_sum_element.click()

        # Wait for redirection to /problem
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/problem'))
        assert driver.current_url == 'https://peercode.net/problem', "Navigation to /problem failed"

        # Find and click on "Solutions" button
        solutions_button_element = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@id='problempage-full-width-tab-1']")))
        solutions_button_element.click()
        assert solutions_button_element.get_attribute("aria-selected") == "true"

    finally:
        driver.quit()

def test_editor_submissions_panel_success():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://peercode.net/login')
    wait = WebDriverWait(driver, 10)
    try:
        # Login
        email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))
        password = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']")))
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))

        email.send_keys('test@test.com')
        password.send_keys('tester')
        login_button.click()

        # Wait for the next page to load after login
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/dashboard'))
        assert driver.current_url == 'https://peercode.net/dashboard', "Login failed"

        # Find and click the 'Two Sum' element
        two_sum_element = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@class='title-div' and text()='Two Sum']")))
        two_sum_element.click()

        # Wait for redirection to /problem
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/problem'))
        assert driver.current_url == 'https://peercode.net/problem', "Navigation to /problem failed"

        # Find and click on "Submissions" button
        submissions_button_element = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@id='problempage-full-width-tab-2']")))
        submissions_button_element.click()
        assert submissions_button_element.get_attribute("aria-selected") == "true"

    finally:
        driver.quit()
