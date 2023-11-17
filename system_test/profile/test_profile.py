from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")

def test_settings_edit_profile_success():
    '''
    driver = webdriver.Chrome()#options=chrome_options
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

        # Find the dropdown menu
        dropdown_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@aria-label="Open settings"]')))
        dropdown_button.click()

        # Wait for 'Profile' item within the dropdown to be clickable and click on it
        profile_item = wait.until(EC.element_to_be_clickable((By.XPATH, '//li[.//p[text()="Profile"]]')))
        profile_item.click()
        
        WebDriverWait(driver, 10).until(EC.url_to_be('https://peercode.net/profile'))
        assert driver.current_url == 'https://peercode.net/profile', "Navigation to /profile failed"

        edit_icon = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@class='edit-icon']")))

        # Scroll to the element
        driver.execute_script("arguments[0].scrollIntoView(true);", edit_icon)
        
        # Simulate a click using JavaScript
        driver.execute_script("arguments[0].click();", edit_icon)

        display_name = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='text']")))
        save_changes = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@fdprocessedid='tu3qak']")))

        display_name.send_keys('change')
        save_changes.click()

        driver.refresh()

        username = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//div[@class='username']")))
        assert 'change' in username.text, "Editing profile failed"

    finally:
        driver.quit()
'''

