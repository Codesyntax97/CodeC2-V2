import os
print("""
               \033[37m           ,MMM\033[35m8&&&.
               \033[37m      _...MMMMM\033[35m88&&&&..._
               \033[37m   .::'''MMMMM8\033[35m8&&&&&&'''::.
               \033[37m  ::     MMMMM8\033[35m8&&&&&&     ::
               \033[37m  '::....MMMMM8\033[35m8&&&&&&....::'
               \033[37m     `''''MMMMM\033[35m88&&&&''''`
               \033[37m           'MMM\033[35m8&&&'
""")

print("""\33[0;32m[1] RUN\n[2] CANCEL\nWhich one do you use?""")

c = input(">>>: ")
if c == "1":
    os.system(f'bash Setup.sh')
    os.system("cd ..")

elif c == "2":
    os.system("clear")

print("\33[0;32m[ √ ] S U C C E S S F U L L Y")
