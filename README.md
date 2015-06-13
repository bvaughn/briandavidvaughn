# Upload files by command line..
cd dist/
~/gsutil/gsutil rsync -R . gs://www.briandavidvaughn.com

# Sharing objects publicly
~/gsutil/gsutil acl ch -u AllUsers:R gs://www.briandavidvaughn.com

# Get info about a file
~/gsutil/gsutil ls -L gs://www.briandavidvaughn.com/built.js

# Disable caching
~/gsutil/gsutil setmeta -h Cache-Control:no-cache -R gs://www.briandavidvaughn.com/

# Default public-read permissions for bucket
~/gsutil/gsutil defacl set public-read gs://www.briandavidvaughn.com
