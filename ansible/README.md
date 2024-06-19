# ansible

### usefull commands

```bash
ansible-playbook -i inventory/hosts.yml playbooks/your_playbook.yml
# or with ansible.cfg
ansible-playbook -i hosts deploy_fronted.yml
```

### ansible.cfg

```bash
[defaults]
inventory = inventory/hosts.yml
```
