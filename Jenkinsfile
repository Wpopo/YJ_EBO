def projName = env.JOB_NAME.replaceAll('/', '-')
def p = "${projName}-${env.BUILD_NUMBER}"

podTemplate(label: p, containers: []) {
    node(p) {
        ansiColor('xterm') {
            def jenkinsFile = fileLoader.fromGit('Jenkinsfile-QAT-Deployer', 'git@git-ssh-inp.yjtech.tw:devops/inp-deployer.git', 'master', 'jenkins-inumplatform-ssh-key', p)
        }
    }
}
