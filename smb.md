### 📖 Complete Guide: Sharing `~/VM-Share` from Zorin OS to Windows Server 2025

#### 1. Introduction
When you want your Windows Server 2025 to access files stored on your Zorin OS machine — in this case wallpapers inside `~/VM-Share` — the most reliable method is to use **Samba**. Samba implements the SMB/CIFS protocol, the same one Windows uses for file sharing. By configuring Samba correctly, you can make your Linux folder appear as a network share that Windows can browse, read, and even write to if you allow it.

This guide will cover:
- Installing and configuring Samba on Zorin OS.
- Setting up the `~/VM-Share` directory as a persistent share.
- Managing permissions and access control.
- Connecting from Windows Server 2025.
- Ensuring persistence across reboots.
- Troubleshooting common issues.
- Security and performance considerations.


#### 2. Understanding Samba and SMB
- **SMB/CIFS**: The protocol Windows uses for file and printer sharing.
- **Samba**: The open‑source implementation that allows Linux systems to speak SMB.
- **Shares**: Named resources (like folders) that are published to the network.
- **Users and permissions**: Samba can allow guest access or require credentials.

By default, Windows Server expects SMB shares to be available at paths like `\\hostname\sharename`.


#### 3. Preparing Your Folder
Your target folder is `~/VM-Share`. Let’s make sure it exists and has proper permissions.

```bash
mkdir -p ~/VM-Share
chmod 755 ~/VM-Share
```

- `mkdir -p` ensures the folder exists.
- `chmod 755` makes it readable by everyone, writable by you.


#### 4. Installing Samba
On Zorin OS (Ubuntu‑based), install Samba:

```bash
sudo apt update
sudo apt install samba
```

This installs the `smbd` service, which runs automatically at boot.


#### 5. Configuring Samba
Edit the Samba configuration file:

```bash
sudo nano /etc/samba/smb.conf
```

At the bottom, add:

```
[VM-Share]
path = /home/yourusername/VM-Share
browseable = yes
read only = no
guest ok = no
valid users = yourusername
```

Replace `yourusername` with your actual Linux account name.

### Explanation:
- **path**: The folder you want to share.
- **browseable**: Makes it visible in network browsing.
- **read only**: Set to `no` so you can write wallpapers from Windows if desired.
- **guest ok**: Disabled for security.
- **valid users**: Restricts access to your account.


#### 6. Creating a Samba User
Samba requires its own password database. Add your Linux user to Samba:

```bash
sudo smbpasswd -a yourusername
```

Enter a password. This is the password you’ll use from Windows Server 2025.


#### 7. Restarting Samba
Apply changes:

```bash
sudo systemctl restart smbd
```


#### 8. Finding Your IP Address
Windows needs to know where to connect. Run:

```bash
hostname -I
```

Suppose it returns `192.168.1.50`.


#### 9. Connecting from Windows Server 2025
On your server:
1. Open **File Explorer**.
2. In the address bar, type:
   ```
   \\192.168.1.50\VM-Share
   ```
3. Enter the Samba username and password you created.
4. You’ll see the wallpapers inside.


#### 10. Mapping a Network Drive
To make it persistent:
1. Right‑click the share → **Map Network Drive**.
2. Choose a drive letter (e.g., W:).
3. Check **Reconnect at sign‑in**.
4. Enter credentials and save.

Now the share will survive reboots on both sides.


#### 11. Persistence on Zorin OS
Because the share is defined in `/etc/samba/smb.conf` and `smbd` is enabled at boot, the share is **system‑level persistent**. It will always be available after reboot.


#### 12. Permissions and Ownership
If Windows cannot write files:
- Ensure Linux ownership is correct:
  ```bash
  chown yourusername:yourusername ~/VM-Share
  ```
- Adjust Samba config to allow write access:
  ```
  read only = no
  ```


#### 13. Security Considerations
- Avoid `guest ok = yes` unless you want anonymous access.
- Use strong Samba passwords.
- Restrict access to your local network via firewall rules.
- Keep Samba updated.


#### 14. Troubleshooting
- **Windows cannot connect** → Check firewall (`ufw allow samba`).
- **Permission denied** → Verify `valid users` and folder ownership.
- **Share not visible** → Ensure `browseable = yes`.
- **Wrong password** → Reset with `sudo smbpasswd -a yourusername`.


#### 15. Advanced Options
- **Read‑only shares**: Set `read only = yes` if you only want Windows to read wallpapers.
- **Multiple users**: Add more `valid users`.
- **Access control lists (ACLs)**: Fine‑tune permissions.
- **Automount in Windows via Group Policy**: For enterprise setups.


#### 16. Example Full Configuration
Here’s a complete `/etc/samba/smb.conf` snippet:

```
[global]
   workgroup = WORKGROUP
   server string = Zorin Samba Server
   security = user
   map to guest = never

[VM-Share]
   path = /home/yourusername/VM-Share
   browseable = yes
   read only = no
   guest ok = no
   valid users = yourusername
```


#### 17. Workflow Example
Imagine you design wallpapers on Zorin OS, save them into `~/VM-Share`, and then from Windows Server 2025 you map the share to `W:`. Now you can set wallpapers directly from the server without copying files manually.


#### 18. Best Practices
- Keep shares minimal — only expose what’s needed.
- Use descriptive share names.
- Document support dates (like your Server 2022/2025 wallpapers).
- Regularly audit Samba logs (`/var/log/samba/`).


#### 19. Conclusion
By following these steps, your `~/VM-Share` folder becomes a **persistent, secure, system‑level Samba share**. Windows Server 2025 can read wallpapers from it seamlessly, and you can manage access with credentials. The setup survives reboots, integrates with Windows drive mapping, and scales to multiple users if needed.


### EOF (2026/09/18)
