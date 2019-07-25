# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string||
|e_mail|string||
|password|string||

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string||

### Association
 has_many :members
- has_many :users, through: :members

## messageテーブル
|body|text||
|image|string||
|group_id|integer||
|user_id|integer||

### Association
- belongs_to :group
- belongs_to :user


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
