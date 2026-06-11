import json, os, re, time, requests
API_KEY = os.environ["LOVABLE_API_KEY"]
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
MODEL = "google/gemini-2.5-flash-lite"
CONFIGS = {
 "physics1":{"path":"src/data/AP_Physics_1_question_bank_200.json","prefix":"AP_Physics_1_","system":"AP Physics 1 writer. STRICT JSON array only. PLAIN TEXT math only — NO LaTeX, NO backslashes. Use ^ for exponents, * mult, / div, sqrt(). Each item {id,question,choices{A,B,C,D},answer,difficulty(5-9),explanation}. Topics: kinematics, Newton's laws, energy, momentum, rotation, gravitation, SHM, waves. Units (m/s,N,J,kg).","user":"Generate {n} AP Physics 1 MCQs starting id AP_Physics_1_{start}. JSON array only."},
 "french":{"path":"src/data/AP_French_Language_question_bank_200.json","prefix":"AP_French_","system":"AP French writer. ALL in FRENCH. STRICT JSON array. Each {id,question,choices{A,B,C,D},answer,difficulty(5-9),explanation}. Grammar, vocab, idioms, francophone culture. Plain text.","user":"Generate {n} AP French MCQs starting id AP_French_{start}. JSON array only."},
 "german":{"path":"src/data/AP_German_question_bank_200.json","prefix":"AP_German_","system":"AP German writer. ALL in GERMAN. STRICT JSON array. Each {id,question,choices{A,B,C,D},answer,difficulty(5-9),explanation}. Cases, Konjunktiv, vocab, idioms, culture.","user":"Generate {n} AP German MCQs starting id AP_German_{start}. JSON array only."},
 "italian":{"path":"src/data/AP_Italian_question_bank_200.json","prefix":"AP_Italian_","system":"AP Italian writer. ALL in ITALIAN. STRICT JSON array. Each {id,question,choices{A,B,C,D},answer,difficulty(5-9),explanation}. Congiuntivo, passato prossimo, prep, vocab, idioms, culture.","user":"Generate {n} AP Italian MCQs starting id AP_Italian_{start}. JSON array only."},
 "spanish_lit":{"path":"src/data/AP_Spanish_Literature_question_bank_200.json","prefix":"AP_Spanish_Lit_","system":"AP Spanish Literature writer. ALL in SPANISH. STRICT JSON array. Each {id,question,choices{A,B,C,D},answer,difficulty(5-9),explanation}. Reading list: Conde Lucanor, Cervantes, Lope, Calderon, Quevedo, Sor Juana, Becquer, Larra, Pardo Bazan, Unamuno, Dario, Machado, Lorca, Neruda, Borges, Cortazar, Garcia Marquez, Allende, Burgos, Morejon.","user":"Generate {n} AP Spanish Lit MCQs starting id AP_Spanish_Lit_{start}. JSON array only."},
}
def sanitize(s):
    s=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',s)
    s=re.sub(r'\\(?!["\\/bfnrtu])','',s)
    s=re.sub(r',(\s*[\]}])',r'\1',s)
    return s
def gen(cfg,start,n):
    for a in range(3):
        try:
            r=requests.post(URL,headers={"Authorization":f"Bearer {API_KEY}","Content-Type":"application/json"},json={"model":MODEL,"messages":[{"role":"system","content":cfg["system"]},{"role":"user","content":cfg["user"].format(n=n,start=start)}],"temperature":0.85},timeout=120)
            if r.status_code==429: print("429"); time.sleep(30); continue
            if r.status_code==402: return None,True
            r.raise_for_status()
            txt=r.json()["choices"][0]["message"]["content"].strip()
            txt=re.sub(r'^```(?:json)?\s*','',txt); txt=re.sub(r'\s*```$','',txt)
            m=re.search(r'\[.*\]',txt,re.DOTALL)
            if m: txt=m.group(0)
            return json.loads(sanitize(txt)),False
        except Exception as e: print(f"  err {a}: {str(e)[:120]}"); time.sleep(3)
    return [],False
def topup(name,target=300,batch=25):
    cfg=CONFIGS[name]; data=json.load(open(cfg["path"]))
    print(f"=== {name}: {len(data)} -> {target} ===")
    nums=[int(m.group(1)) for q in data for m in [re.search(r'(\d+)$',q.get("id","0"))] if m]
    nid=(max(nums) if nums else 0)+1
    while len(data)<target:
        need=min(batch,target-len(data))
        items,ex=gen(cfg,nid,need)
        if ex: return "EX"
        if not items: nid+=need; continue
        added=0
        for q in items:
            if not isinstance(q,dict) or not all(k in q for k in ("question","choices","answer")): continue
            q["id"]=f"{cfg['prefix']}{nid+added}"; data.append(q); added+=1
            if len(data)>=target: break
        nid+=added
        json.dump(data,open(cfg["path"],"w"),ensure_ascii=False,indent=2)
        print(f"  {name}: {len(data)}")
        time.sleep(1)
    return "OK"
for n in ["physics1","french","german","italian","spanish_lit"]:
    if topup(n)=="EX": print("CREDITS EXHAUSTED"); break
print("DONE")
