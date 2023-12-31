# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2023-06-28

### Added
 - Parse backend functionality
 - React Routing
 - Parse Models for Note and User classes

## [0.3.0] - 2023-07-06

### Added
 - Parse Service with authentication methods
 - Login/Register components that utilize authentication methods from service
 - ProtectedRoute component that handles all routes that should not be accessed without login

## [0.4.0] - 2023-07-22

### Added
 - Algolia search bar integration for users to be able to easily find their notes
 - Express server for reindexing Algolia databases
 - Password reset functionality
 - Note collaboration functionality
 - Ability to download notes
 - Vercel deployment of app

### Changed
 - Styling for the authentication components