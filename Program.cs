/*using System;

namespace FirstTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
*/

// Sources
// https://www.fleekitsolutions.com/use-selenium-c-visual-studio-code/
// https://medium.com/@tanveer.khan/dotnet-core-selenium-nunit-visual-studio-code-2d489ccb2089
// https://www.techbeamers.com/websites-to-practice-selenium-webdriver-online/
// https://www.techlistic.com/2020/07/automation-testing-demo-websites.html
// http://the-internet.herokuapp.com/

using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Chrome;
using System;
using NUnit.Framework;


namespace tests.selenium
{

class Program
{

public IWebDriver driver;

[SetUp]
public void TestSetup(){
    driver = new ChromeDriver();
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
    driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/");
}

[Test]
public void FirstTest(){
    driver.FindElement(By.XPath("//*[contains(text(), 'A/B Testing')]")).Click();
    Assert.True(driver.FindElement(By.XPath("//*[contains(text(), 'A/B Test')]")).Displayed);
    Console.WriteLine("FirstTest");
}

[Test]
public void SecondTest(){
    driver.FindElement(By.XPath("//*[contains(text(), 'JQuery UI Menus')]")).Click();
    driver.FindElement(By.Id("ui-id-2")).Click();
    Assert.True(driver.FindElement(By.Id("ui-id-4")).Displayed);
    driver.FindElement(By.Id("ui-id-4")).Click();
    Assert.True(driver.FindElement(By.Id("ui-id-6")).Displayed);
}
  
[Test]
public void ThirdTest(){
    Assert.Fail();
}

[Test]
public void FourthTest(){
    Assert.False(driver.FindElement(By.Id("ui-id-6")).Displayed);
}


[TearDown]
public void TestTearDown(){
driver.Quit();
}

}
    
}