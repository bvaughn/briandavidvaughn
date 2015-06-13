# Upload files by command line..
cd dist/
gsutil rsync -R . gs://www.briandavidvaughn.com

# Sharing objects publicly
gsutil acl ch -u AllUsers:R gs://www.briandavidvaughn.com
