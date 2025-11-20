@echo off
chcp 65001 >nul
echo ========================================
echo   法律知识学习系统 - 快速部署脚本
echo ========================================
echo.

echo [1/6] 检查Git是否已安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Git，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git已安装

echo.
echo [2/6] 初始化Git仓库...
if not exist .git (
    git init
    echo ✅ Git仓库已初始化
) else (
    echo ℹ️  Git仓库已存在
)

echo.
echo [3/6] 添加文件到Git...
git add home.html index.html law.html data.js app.js lawData.js lawApp.js README.md .gitignore
echo ✅ 文件已添加

echo.
echo [4/6] 提交更改...
git commit -m "🎉 初始化法律知识学习系统" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 提交成功
) else (
    echo ℹ️  没有需要提交的更改（或已提交）
)

echo.
echo [5/6] 配置远程仓库...
echo.
echo ⚠️  请在GitHub上创建一个新仓库（如果还没有）
echo    访问: https://github.com/new
echo    仓库名建议: law-knowledge-system
echo.
set /p REPO_URL="请输入仓库URL (如: https://github.com/username/law-knowledge-system.git): "

if "%REPO_URL%"=="" (
    echo ❌ 未输入仓库URL，部署取消
    pause
    exit /b 1
)

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
echo ✅ 远程仓库已配置

echo.
echo [6/6] 推送到GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   🎉 部署成功！
    echo ========================================
    echo.
    echo 接下来的步骤:
    echo 1. 访问你的GitHub仓库
    echo 2. 点击 Settings ^> Pages
    echo 3. Source选择: Deploy from a branch
    echo 4. Branch选择: main / (root)
    echo 5. 点击 Save
    echo.
    echo 等待1-2分钟后，访问你的网站:
    echo https://你的用户名.github.io/仓库名/home.html
    echo.
) else (
    echo ❌ 推送失败，请检查:
    echo   - GitHub仓库是否已创建
    echo   - Git凭据是否正确
    echo   - 网络连接是否正常
)

pause
