from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
from splinter import Browser
import time

# Create a dictionary for all of the scraped data
mars_data = {}

def scrape():
    #Latest News
    response = requests.get('https://mars.nasa.gov/news/').text

    soup = bs(response, 'lxml')

    news_title = soup.find('div', class_ = 'content_title').text

    news_sum = soup.find('div', class_ = 'rollover_description_inner').text

    # Add the title and summary to the dictionary
    mars_data["news_title"] = news_title
    mars_data["news_sum"] = news_sum


    #JPL Mars Space Image url
    executable_path = {'executable_path':'chromedriver.exe'}
    browser = Browser('chrome', **executable_path)
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&catagory=Mars'
    browser.visit(url)
    browser.find_by_css('footer').click()
    browser.find_by_xpath('//*[@id="fancybox-lock"]/div/div[2]/div/div[1]/a[2]').click()
    browser.find_by_css('figure').click()
    featured_image_url = browser.url
    browser.quit()

    # Add the featured image url to the dictionary
    mars_data["featured_image_url"] = featured_image_url


    #Mars Weather from twitter
    executable_path = {'executable_path':'chromedriver.exe'}
    browser = Browser('chrome', **executable_path)
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    response = requests.get('https://twitter.com/marswxreport?lang=en').text
    soup = bs(response, 'lxml')

    num = 1

    for result in soup.find_all('p', class_ ="tweet-text"):
        result = str(result)
        
        if "InSight" in result:
            start = 'InSight '
            end = '<a'   
            mars_weather = (result[result.find(start)+len(start):result.rfind(end)])
            
            break
        else:
            num = num + 1
            if num > 20:
                break
                
    browser.quit()

    # Add the weather to the dictionary
    mars_data["mars_weather"] = mars_weather


    # Visit the Mars facts webpage and scrape table data into Pandas
    executable_path = {'executable_path':'chromedriver.exe'}
    browser = Browser('chrome', **executable_path)
    url = 'https://space-facts.com/mars/'
    browser.visit(url)
    # place data into a dataframe output to an HTML string
    grab=pd.read_html(url)
    df_mars_data=pd.DataFrame(grab[0])
    df_mars_data.columns=['Mars','Data']
    df_mars_table=df_mars_data.set_index("Mars")
    marsdata_html = df_mars_table.to_html(classes='marsdata')
    marsdata_html=marsdata_html.replace('\n', ' ')

    browser.quit()

    # Add the Mars facts table to the dictionary
    mars_data["mars_table"] = marsdata_html


    #Mars Hemisphers
    executable_path = {'executable_path':'chromedriver.exe'}
    browser = Browser('chrome', **executable_path)
    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)
    mars_hemis=[]

    for i in range (4):
        time.sleep(5)
        images = browser.find_by_tag('h3')
        images[i].click()
        new_url = browser.url
        response = requests.get(new_url).text
        soup = bs(response, 'lxml')
        partial = soup.find("img", class_="wide-image")["src"]
        img_title = soup.find("h2",class_="title").text
        img_url = 'https://astrogeology.usgs.gov'+ partial
        dictionary={"title":img_title,"img_url":img_url}
        mars_hemis.append(dictionary)
        browser.back()
    
    mars_data['mars_hemis'] = mars_hemis

    browser.quit()

    return mars_data

