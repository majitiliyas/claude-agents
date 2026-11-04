import json, subprocess, sys
S=sys.argv[1]; SRC=sys.argv[2]
segs=[(0.00,7.05),(8.28,11.62),(11.98,17.62),(17.98,19.97),(20.68,23.58),(23.90,25.26),(25.64,31.95),(32.90,37.98),(38.42,41.16)]
HOLD=0.7
txt={0:"На",1:"3",2:"тысячи",3:"грантов",4:"Tech Orda",5:"в",6:"этом",7:"году",8:"подали",9:"30",10:"тысяч",11:"заявок.",
12:"Салам,",13:"айтишники!",14:"Я",15:"Ильяс",16:"из KAI.",17:"Давайте",18:"разбираться.",
19:"Я",20:"аналитик,",21:"поэтому",22:"я",23:"открыл",24:"витрину",25:"Astana Hub",26:"и",27:"посчитал.",
28:"Выходит",29:"примерно",30:"один",31:"грант",32:"на",33:"11",34:"заявок.",
35:"Из",36:"них",37:"Data",38:"Analyst —",39:"18",40:"заявок",41:"на",42:"место,",43:"DevOps",44:"для",45:"новичков —",46:"около",47:"30.",
48:"Ну",49:"а",50:"честная",51:"оговорка:",53:"это",54:"заявки,",55:"а",56:"не люди.",
57:"Один",58:"человек",59:"может",60:"подать",61:"несколько,",62:"но",63:"без",64:"гранта",65:"остались",66:"тысячи.",
67:"Это",68:"не",69:"значит,",70:"что",71:"они",72:"слабые.",73:"Просто",74:"места",75:"ограничены.",
76:"Я",77:"собрал гайд:",78:"какие",80:"IT-профессии",81:"растут",82:"до",83:"2030",84:"года,",85:"где",86:"учиться,",87:"если",88:"нет",89:"гранта.",
90:"Напиши",91:"в",92:"комментариях",93:"«ПРОФЕССИИ»,",94:"я",95:"пришлю",96:"тебе",97:"гайд."}
W=json.load(open(f"{S}/reel/words.json"))
# merge timing for dropped indices
W[79]["e"]=W[79]["e"]; W[80]["s"]=W[79]["s"]
W[51]["e"]=W[52]["e"]
out=[]; starts=[]; t=0
for a,b in segs: starts.append(t); t+=b-a
total=t+HOLD
for i,w in enumerate(W):
    if i not in txt: continue
    for k,(a,b) in enumerate(segs):
        if a-0.05<=w["s"]<b:
            ns=starts[k]+max(w["s"],a)-a; ne=starts[k]+min(w["e"],b)-a
            out.append({"i":i,"text":txt[i],"s":round(ns,3),"e":round(ne,3),"seg":k}); break
    else: print("DROPPED",i,w)
json.dump({"words":out,"segStarts":[round(x,3) for x in starts],"duration":round(total,3)},open(f"{S}/reel/app/src_data.json","w"),ensure_ascii=False,indent=1)
print("duration",total)
# ffmpeg
fc=[]; n=len(segs)
for k,(a,b) in enumerate(segs):
    d=b-a
    fc.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{k}]")
    fc.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={d-0.03:.3f}:d=0.03[a{k}]")
fc.append("".join(f"[v{k}][a{k}]" for k in range(n))+f"concat=n={n}:v=1:a=1[vc][ac]")
fc.append(f"[vc]scale=1080:1920:flags=lanczos,fps=30,tpad=stop_mode=clone:stop_duration={HOLD},format=yuv420p[vo]")
fc.append(f"[ac]highpass=f=80,afftdn=nf=-25,loudnorm=I=-14:TP=-1.5:LRA=11,apad=pad_dur={HOLD},aresample=48000[ao]")
cmd=["ffmpeg","-y","-v","error","-i",SRC,"-filter_complex",";".join(fc),"-map","[vo]","-map","[ao]","-c:v","libx264","-crf","16","-preset","medium","-c:a","aac","-b:a","192k","-t",f"{total:.3f}",f"{S}/reel/app/public/base.mp4"]
subprocess.run(cmd,check=True)
