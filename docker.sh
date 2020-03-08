# This script is used to run Docker Compose and set up a development 
# environment for your local branch.

# Validate the arguments
if [[ "$#" -ne 1 || ! ("$1" == "start" || "$1" == "stop" || "$1" == "logs") ]]; then

    echo "Usage: ./docker.sh start|stop|logs"
    exit 0

fi

# Determine the current git branch
GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

if [ -z "$GIT_BRANCH" ]; then

    echo "Could not determine the current git branch"
    exit 0

fi

# Export the git branch name so Docker Compose can access it
export GIT_BRANCH

if [[ "$1" == "start" ]]; then

    echo "Running Docker Compose for branch ${GIT_BRANCH}"
    docker-compose -f docker-compose.dev.yml up -d

elif [[ "$1" == "stop" ]]; then

    echo "Stopping Docker Compose for branch ${GIT_BRANCH}"
    docker-compose -f docker-compose.dev.yml down

elif [[ "$1" == "logs" ]]; then

    docker logs -f homecontrol_server_"${GIT_BRANCH}"

fi