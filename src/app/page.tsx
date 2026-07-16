export default function Home() {
  return (
    <main className="min-h-full bg-[#f7f8f5] text-[#17211b]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#173c2a] text-lg font-bold text-white">
              V
            </div>
            <span className="text-xl font-semibold tracking-tight">Vocabuddy</span>
          </div>
          <span className="rounded-full border border-[#dce5dc] bg-white px-3 py-1 text-xs text-[#657267]">
            开发阶段 · Phase 0
          </span>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[#6b806f]">
              Learn with context
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-7xl">
              用母语理解，
              <br />
              用目标语言成长。
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#657267]">
              Vocabuddy 会根据你的母语、目标、节奏和好友推荐，安排每天真正适合你的词汇学习。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#173c2a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#24563d]">
                开始学习
              </button>
              <button className="rounded-full border border-[#cbd8cc] bg-white px-6 py-3 text-sm font-medium text-[#31513c] transition hover:bg-[#eef4ee]">
                查看学习计划
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#dce5dc] bg-white p-5 shadow-[0_24px_70px_rgba(34,67,45,0.08)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#edf1ed] pb-5">
              <div>
                <p className="text-sm text-[#7a887c]">今日学习</p>
                <h2 className="mt-1 text-2xl font-semibold">中文 → English</h2>
              </div>
              <span className="rounded-full bg-[#edf6ee] px-3 py-1 text-xs font-medium text-[#3b6e49]">
                进行中
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 py-6">
              <Metric label="新词" value="15" />
              <Metric label="待复习" value="12" />
              <Metric label="预计" value="12 min" />
            </div>
            <div className="rounded-2xl bg-[#f4f7f3] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#7a887c]">下一张单词卡</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">context</p>
                  <p className="mt-1 text-sm text-[#718074]">语境；上下文</p>
                </div>
                <span className="text-2xl">◌</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#dfe9df]">
                <div className="h-full w-[42%] rounded-full bg-[#5d9870]" />
              </div>
              <p className="mt-3 text-xs text-[#7a887c]">今日进度 42%</p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#e3eae3] py-5 text-xs text-[#7a887c] sm:flex-row sm:items-center sm:justify-between">
          <span>四个首发语言方向 · 母语优先解释</span>
          <span>个人学习闭环 + 跨母语好友推荐</span>
        </footer>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#edf1ed] bg-[#fbfcfa] p-4">
      <p className="text-xs text-[#7a887c]">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
