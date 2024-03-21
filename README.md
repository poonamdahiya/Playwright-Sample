# Applitools Tutorial - Playwright

Get started with Applitools Eyes visual testing with these examples of using the [Playwright](https://playwright.dev/) and the [Eyes Playwright SDK](https://www.npmjs.com/package/@applitools/eyes-playwright).

- [Quick Start](#%EF%B8%8F-quick-start)
- [Running Tests Locally](#-running-the-tests-locally)
- [What's Inside](#-whats-inside)
- [Add Applitools Eyes to your Playwright project](#-add-applitools-eyes-to-your-playwright-project)

## ⚡️ Quick Start

Run your first test in just a few minutes by cloning this repository!

1. Click the **Use this template** button at the top of the repository or [click here](https://github.com/applitools/tutorial-playwright/generate) to create a new repository
2. Add your Applitools API Key as a [repository Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) under the Settings tab called `APPLITOOLS_API_KEY`
3. Navigate to the Actions tab, find and select the CI workflow, and select Run Workflow

And that's it! Your tests should now be available to review in the Applitools dashboard.

## 🚀 Running the Tests Locally

### Installing Dependencies
```
npm install
```

### Set Applitools API Key

Before running your test, you need to make your API key available to the environment. You can do this by either prepending your test command or exporting it in your terminal session.

To prepend, run you a command like `npm test` as:

```
APPLITOOLS_API_KEY="[Your Key]" npm test
```

To export your API key on a Mac, run:

```
export APPLITOOLS_API_KEY="[Your Key]"
```

To export your API key on Windows, run:

```
set APPLITOOLS_API_KEY="[Your Key]"
```

### Running Tests
```
npm test
```

## 🧐 What's inside?

### Test Examples

This repository includes a variety of examples on how you can use Applitools Eyes with your Playwright project.

- Basic: running the Eyes SDK without a manually configured runner
- Classic: running the Eyes SDK with the Classic runner (locally)
- Ultrafast: running the Eyes SDK with the Applitools Ultrafast Grid (cloud)

### GitHub Action Workflows

Also included are two separate GitHub Actions.

- tests.yml: runs the suite of tests whenever changes are pushed to the main branch or whenever a pull request is targeted to the main branch
- updates.yml: runs daily via cron schedule updating all project dependencies

Note: updates.yml is intended to be a tool for Applitools to maintain this tutorial with its limited depedencies and scope. It's not recommended to automatically upgrade all dependencies without process and proper review.

## 👀 Add Applitools Eyes to your Playwright project

Learn more about how to install and integrate the Eyes SDK with our [Playwright tutorial](https://applitools.com/tutorials/playwright.html)!

<https://applitools.com/tutorials/playwright.html>

## 🧰 More Information

Learn more about Applitools [Eyes](https://info.applitools.com/ucY77) and the [Ultrafast Test Cloud](https://info.applitools.com/ucY78) at [applitools.com](https://info.applitools.com/ucY76).

More about the Eyes Playwright SDK:
* https://www.npmjs.com/package/@applitools/eyes-playwright
* https://applitools.com/docs/api/eyes-sdk/index-gen/classindex-playwright-javascript.html
