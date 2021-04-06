@echo off
:loop
start start.bat 
timeout /t 86400000 >null
taskkill /f /im start.bat >null
goto loop