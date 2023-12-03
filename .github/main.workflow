workflow "Proyecto Workflow" {
    on = "push"
    resolves = ["Build"]
}

action "install" {
    uses = "docker://node"
    args = "install"
}