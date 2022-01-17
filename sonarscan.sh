# sonar-scanner stuff

sonar-scanner \
  -Dsonar.projectKey=team11-twitter-client \
  -Dsonar.sources=src,backend/middleware,backend/routes \
  -Dsonar.host.url=https://aminsep.disi.unibo.it/sonarqube \
  -Dsonar.login=bb4b2bff72d2f1eb8c5ee96d73e1ce893cd67734 \
  -Dsonar.language=js \
  -Dsonar.tests=jest \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.tests=src/Components/__tests__/ \
  -Dsonar.coverage.exclusions=**/__tests__/**,**/coverage/** \
  -Dsonar.test.inclusions=**/__tests__/** \
  # -Dsonar.log.level=DEBUG